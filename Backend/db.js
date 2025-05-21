require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'switchback.proxy.rlwy.net',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'iMhmKblwPyUmVypWtRQUJVQvisNZcIAQ',
  database: process.env.DB_NAME || 'railway',
  port: process.env.DB_PORT || 21382,
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('✅ MySQL Connected');
});

module.exports = connection;


// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '', // default kosong di XAMPP
//   database: 'juugo.garage'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err.stack);
//     return;
//   }
//   console.log('✅ MySQL Connected');
// });

// module.exports = connection;
