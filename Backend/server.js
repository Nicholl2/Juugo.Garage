const express = require('express');
const mysql = require('mysql2/promise'); // Gunakan promise-based
const cors = require('cors');
const app = express();

// Database Configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // HARAP DIISI!
  database: 'juugo.garage' // Ganti titik dengan underscore
};

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Database Connection Pool
const pool = mysql.createPool(dbConfig);

// Test Database Connection
pool.getConnection()
  .then(conn => {
    console.log('✅ Connected to MySQL database');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  });

// Register Endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Semua field wajib diisi' 
      });
    }

    // Cek apakah user sudah ada
    const [existingUsers] = await pool.query(
      `SELECT * FROM users WHERE email = ? OR username = ?`,
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'Username atau email sudah digunakan' 
      });
    }

    // Insert user baru
    await pool.query(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password] // Catatan: Password sebaiknya di-hash (misalnya pakai bcrypt)
    );

    res.status(201).json({ 
      success: true, 
      message: 'Registrasi berhasil' 
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan server saat registrasi' 
    });
  }
});

// Endpoint untuk mendapatkan layanan
app.get('/api/services', async (req, res) => {
  try {
    const [services] = await pool.query('SELECT * FROM services');
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint untuk membuat order
app.post('/api/orders', async (req, res) => {
  try {
    const { id_users, id_services, full_name, phone, email, licence } = req.body;

    if (!id_users || !id_services || !full_name || !phone || !email || !licence) {
      return res.status(400).json({ 
        success: false,
        message: 'Semua field wajib diisi' 
      });
    }

    const [result] = await pool.query(
      `INSERT INTO orders 
       (id_users, id_services, full_name, phone, email, licence) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_users, id_services, full_name, phone, email, licence]
    );

    res.status(201).json({
      success: true,
      data: {
        orderId: result.insertId
      },
      message: 'Order berhasil dibuat'
    });

  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ 
      success: false,
      message: 'Terjadi kesalahan server saat membuat order',
      error: err.message
    });
  }
});

// Endpoint untuk membuat booking
app.post('/api/bookings', async (req, res) => {
  let conn;
  try {
    const { 
      id_users, 
      id_services, 
      full_name, 
      phone, 
      email, 
      licence 
    } = req.body;

    if (!id_users || !id_services || !full_name || !phone || !email || !licence) {
      return res.status(400).json({ 
        success: false,
        message: 'Semua field wajib diisi',
        required_fields: ['id_users', 'id_services', 'full_name', 'phone', 'email', 'licence']
      });
    }

    if (!/^\d{10,15}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Nomor telepon harus 10-15 digit angka'
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Format email tidak valid'
      });
    }

    conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
      const [orderResult] = await conn.query(
        `INSERT INTO orders_test 
        (id_users, id_services, full_name, phone, email, licence) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [id_users, id_services, full_name, phone, email, licence]
      );

      const orderId = orderResult.insertId;

      const serviceDate = new Date();
      serviceDate.setDate(serviceDate.getDate() + 3); 
      
      const [historyResult] = await conn.query(
        `INSERT INTO riwayat 
        (id_users, id_services, service_date, deskripsi, id_order) 
        VALUES (?, ?, ?, ?, ?)`,
        [
          id_users, 
          id_services, 
          serviceDate, 
          `Booking untuk ${full_name} (${licence})`, 
          orderId
        ]
      );

      const [serviceData] = await conn.query(
        `SELECT nama_layanan, harga FROM services WHERE id_services = ?`,
        [id_services]
      );

      await conn.commit();

      res.status(201).json({
        success: true,
        message: 'Booking berhasil dibuat',
        data: {
          booking_id: historyResult.insertId,
          order_id: orderId,
          customer: {
            name: full_name,
            phone: phone,
            email: email,
            licence: licence
          },
          service: serviceData[0],
          service_date: serviceDate.toISOString()
        }
      });

    } catch (err) {
      await conn.rollback();
      console.error('Transaction error:', err);
      
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
          success: false,
          message: 'Data user atau service tidak ditemukan'
        });
      }
      
      throw err;
    }
  } catch (err) {
    console.error('Booking failed:', err);
    res.status(500).json({ 
      success: false,
      message: 'Gagal membuat booking',
      error: err.sqlMessage || err.message,
      error_code: err.code
    });
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint ambil history order
app.get('/api/history', async (req, res) => {
  try {
    const { user_id } = req.query;
    console.log('Fetching history for user:', user_id); 

    if (!user_id) {
      return res.status(400).json({ 
        success: false,
        message: 'User ID diperlukan' 
      });
    }

    const [orders] = await pool.query(`
      SELECT 
        o.id_order AS id,
        DATE_FORMAT(o.order_date, '%d %M %Y') AS date,
        'Completed' AS status,
        o.full_name,
        o.phone,
        o.licence,
        s.nama_layanan AS service_name,
        s.harga AS service_price
      FROM orders_test o
      JOIN services s ON o.id_services = s.id_services
      WHERE o.id_users = ?
      ORDER BY o.order_date DESC
    `, [user_id]);

    console.log('Database results:', orders); // Debug log

    const formattedOrders = orders.map(order => ({
      id: order.id,
      date: order.date,
      status: order.status,
      full_name: order.full_name,
      phone: order.phone,
      licence: order.licence,
      items: [{
        name: order.service_name,
        price: order.service_price
      }]
    }));

    res.json({
      success: true,
      data: formattedOrders
    });

  } catch (err) {
    console.error('Error in /api/history:', err);
    res.status(500).json({ 
      success: false,
      message: 'Gagal mengambil history order',
      error: err.message
    });
  }
});

// Login Endpoint (Fixed)
app.post('/api/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    console.log('Login attempt:', identifier);

    if (!identifier || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email/username dan password wajib diisi' 
      });
    }

    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = ? OR username = ?`, 
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'User tidak ditemukan' 
      });
    }

    const user = rows[0];
    
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Password salah' 
      });
    }

    res.json({
      success: true,
      user: {
        id_users: user.id_users, 
        username: user.username,
        email: user.email
     }
    });



  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan server' 
    });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    const fields = [];
    const values = [];

    // Cek apakah email sudah digunakan oleh user lain
    if (email) {
      const [existingEmail] = await pool.query(
        'SELECT id_users FROM users WHERE email = ? AND id_users != ?',
        [email, userId]
      );

      if (existingEmail.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Email sudah digunakan oleh pengguna lain',
        });
      }

      fields.push('email = ?');
      values.push(email);
    }

    if (username) {
      fields.push('username = ?');
      values.push(username);
    }

    if (password && password.trim() !== '') {
      fields.push('password = ?');
      values.push(password); 
    }

    if (fields.length === 0) {
      return res.status(400).json({ success: false, message: 'Tidak ada data untuk diupdate' });
    }

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id_users = ?`;
    values.push(userId);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    const [updatedRows] = await pool.query(
      'SELECT id_users, username, email FROM users WHERE id_users = ?',
      [userId]
    );

    const updatedUser = updatedRows[0];

    res.json({
      success: true,
      message: 'Data berhasil diupdate',
      user: updatedUser,
    });

  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});


// Endpoint untuk update order
app.put('/api/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { full_name, phone, licence } = req.body;

    if (!full_name || !phone || !licence) {
      return res.status(400).json({ 
        success: false,
        message: 'Semua field wajib diisi' 
      });
    }

    const [result] = await pool.query(
      `UPDATE orders_test 
       SET full_name = ?, phone = ?, licence = ?
       WHERE id_order = ?`,
      [full_name, phone, licence, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Order tidak ditemukan' 
      });
    }

    res.json({
      success: true,
      message: 'Order berhasil diupdate'
    });

  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ 
      success: false,
      message: 'Terjadi kesalahan server saat mengupdate order',
      error: err.message
    });
  }
});

// DELETE USER
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  // Validasi ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID user tidak valid' });
  }

  let connection;
  try {
    // Mulai transaksi
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Hapus data riwayat yang terkait dengan order user ini
    await connection.query(
      'DELETE FROM riwayat WHERE id_users = ?',
      [id]
    );

    // 2. Hapus data order yang terkait dengan user ini
    await connection.query(
      'DELETE FROM orders_test WHERE id_users = ?',
      [id]
    );

    // 3. Hapus user itu sendiri
    const [userResult] = await connection.query(
      'DELETE FROM users WHERE id_users = ?',
      [id]
    );

    if (userResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ 
        success: false, 
        message: 'User tidak ditemukan' 
      });
    }

    // Commit transaksi jika semua operasi berhasil
    await connection.commit();

    res.status(200).json({ 
      success: true, 
      message: 'User dan semua data terkait berhasil dihapus' 
    });

  } catch (err) {
    // Rollback transaksi jika terjadi error
    if (connection) await connection.rollback();
    
    console.error('Delete user error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan server',
      error: err.message 
    });
  } finally {
    // Pastikan koneksi dilepas
    if (connection) connection.release();
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

