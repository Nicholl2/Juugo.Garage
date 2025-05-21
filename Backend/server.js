require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const db = require('./db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'juugo_secret_key';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// REGISTERy
app.post('/api/register', async (req, res) => {
  const { nama, email, password } = req.body;

  if (!nama || !email || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [nama, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Gagal register', error: err });
      res.status(200).json({ message: 'Registrasi berhasil' });
    }
  );
});

// LOGIN
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length === 0)
      return res.status(401).json({ message: 'Email tidak ditemukan' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({ message: 'Password salah' });

    res.status(200).json({ message: 'Login berhasil', user });
  });
});

// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;

//   db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//     if (err) return res.status(500).json({ message: 'Server error' });
//     if (results.length === 0)
//       return res.status(401).json({ message: 'Email tidak ditemukan' });

//     const user = results[0];
//     const match = await bcrypt.compare(password, user.password);
//     if (!match)
//       return res.status(401).json({ message: 'Password salah' });

//     // Generate JWT token
//     const token = jwt.sign({ id: user.id_users, email: user.email }, SECRET_KEY, { expiresIn: '1d' });

//     res.status(200).json({ message: 'Login berhasil', token, user });
//   });
// });

// START server
app.listen(PORT, () => {
  console.log(`🚀 Backend berjalan di http://localhost:${PORT}`);
});
