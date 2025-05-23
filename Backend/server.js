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

// Endpoint untuk membuat appointment baru
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

    // Validasi
    if (!id_users || !id_services || !full_name || !phone || !email || !licence) {
      return res.status(400).json({ 
        success: false,
        message: 'Semua field wajib diisi' 
      });
    }

    // Buat order baru
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
      licence, 
      service_date, 
      deskripsi 
    } = req.body;

    if (!id_users || !id_services || !full_name || !phone || !email || !licence || !service_date) {
      return res.status(400).json({ 
        success: false,
        message: 'Semua field wajib diisi'
      });
    }

    conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
      const [orderResult] = await conn.query(
        `INSERT INTO orders 
         (id_users, id_services, full_name, phone, email, licence, order_date) 
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [id_users, id_services, full_name, phone, email, licence]
      );

      const [historyResult] = await conn.query(
        `INSERT INTO riwayat 
         (id_users, id_services, service_date, deskripsi) 
         VALUES (?, ?, ?, ?)`,
        [id_users, id_services, service_date, deskripsi || `Service untuk ${full_name}`]
      );

      const [serviceData] = await conn.query(
        `SELECT nama_layanan, harga FROM services WHERE id_services = ?`,
        [id_services]
      );

      await conn.commit();

      res.status(201).json({
        success: true,
        data: {
          orderId: orderResult.insertId,
          historyId: historyResult.insertId,
          service: serviceData[0]
        },
        message: 'Booking berhasil dibuat'
      });

    } catch (err) {
      await conn.rollback();
      console.error('Transaction error:', err);
      throw err;
    }
  } catch (err) {
    console.error('Booking failed:', err);
    res.status(500).json({ 
      success: false,
      message: 'Gagal membuat booking',
      error: err.message
    });
  } finally {
    if (conn) conn.release();
  }
});

// server.js - Tambahkan endpoint ini
app.get('/api/history', async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ 
        success: false,
        message: 'User ID diperlukan' 
      });
    }

    // Ambil data dari tabel riwayat dan services
    const [orders] = await pool.query(`
      SELECT r.id_riwayat AS id_order,
             r.service_date AS order_date,
             s.nama_layanan,
             s.harga,
             r.deskripsi AS status
      FROM riwayat r
      JOIN services s ON r.id_services = s.id_services
      WHERE r.id_users = ?
      ORDER BY r.service_date DESC
    `, [user_id]);

    // Format hasilnya untuk frontend
    const formattedOrders = orders.map(order => ({
      id: order.id_order,
      date: new Date(order.order_date).toLocaleDateString('id-ID'),
      status: order.status || 'Done',
      items: [{
        name: order.nama_layanan,
        price: order.harga
      }]
    }));

    res.json({
      success: true,
      data: formattedOrders
    });

  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ 
      success: false,
      message: 'Gagal mengambil history order' 
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
    
    // NOTE: Untuk sementara bypass password verification
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Password salah' 
      });
    }

    res.json({
      success: true,
      user: {
        id_users: user.id_users, // ✅ pakai nama kolom yang sesuai di database
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

    if (username) {
      fields.push('username = ?');
      values.push(username);
    }

    if (email) {
      fields.push('email = ?');
      values.push(email);
    }

    if (password && password.trim() !== '') {
      fields.push('password = ?');
      values.push(password); // nanti bisa hashing juga kalau mau
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

    // Ambil data terbaru user setelah update
    const [updatedRows] = await pool.query('SELECT id_users, username, email FROM users WHERE id_users = ?', [userId]);
    const updatedUser = updatedRows[0];

    res.json({ success: true, message: 'Data berhasil diupdate', user: updatedUser });

  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

// DELETE USER
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM users WHERE id_users = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ... (endpoint lainnya tetap sama)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Koneksi ke database MySQL
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // Ganti dengan username DB Anda
//   password: '', // Ganti dengan password DB Anda
//   database: 'juugo.garage', // Ganti dengan nama database Anda
// });

// // Di server.js:
// app.use(cors({
//   origin: 'http://localhost:3000', // Ganti dengan port frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Endpoint untuk login
// app.post('/api/login', (req, res) => {
//   const { identifier, password } = req.body; // Terima identifier (email/username)

//   // Cek apakah input berupa email atau username
//   const isEmail = identifier.includes('@');
  
//   const query = isEmail 
//     ? 'SELECT * FROM users WHERE email = ? AND password = ?'
//     : 'SELECT * FROM users WHERE username = ? AND password = ?';

//   db.query(
//     query,
//     [identifier, password],
//     (err, results) => {
//       if (err) {
//         console.error('Database error:', err);
//         return res.status(500).json({ error: 'Database error' });
//       }
      
//       if (results.length > 0) {
//         const user = results[0];
//         res.json({ success: true, user });
//       } else {
//         res.status(401).json({ 
//           success: false, 
//           message: 'Username/email atau password salah!' 
//         });
//       }
//     }
//   );
// });

// app.post('/api/register', (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'Semua field wajib diisi.' });
//   }

//   // Cek apakah email sudah digunakan
//   db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
//     if (err) return res.status(500).json({ message: 'Kesalahan server.' });

//     if (results.length > 0) {
//       return res.status(400).json({ message: 'Email sudah terdaftar.' });
//     }

//     // Simpan user baru
//     db.query(
//       'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
//       [username, email, password],
//       (err, result) => {
//         if (err) return res.status(500).json({ message: 'Gagal menyimpan user.' });

//         res.status(201).json({ message: 'Registrasi berhasil!' });
//       }
//     );
//   });
// });

// // UPDATE USER
// app.put('/api/users/:id', async (req, res) => {
//   const { id } = req.params;
//   const { username, email, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     db.query(
//       'UPDATE users SET username = ?, email = ?, password = ? WHERE id_users = ?',
//       [username, email, hashedPassword, id],
//       (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (result.affectedRows === 0) {
//           return res.status(404).json({ message: 'User not found' });
//         }
        
//         db.query(
//           'SELECT * FROM users WHERE id_users = ?',
//           [id],
//           (err, results) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.status(200).json(results[0]);
//           }
//         );
//       }
//     );
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // DELETE USER
// app.delete('/api/users/:id', (req, res) => {
//   const { id } = req.params;

//   db.query(
//     'DELETE FROM users WHERE id_users = ?',
//     [id],
//     (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.status(200).json({ message: 'User deleted successfully' });
//     }
//   );
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server berjalan di http://localhost:${PORT}`);
// });