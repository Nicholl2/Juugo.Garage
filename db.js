const mysql = require('mysql2/promise');

// Configurable database connection parameters through environment variables
const config = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '@Starr13',
  database: process.env.MYSQL_DATABASE || 'Juugo.Garage',
};

// Create and export a MySQL connection pool
const pool = mysql.createPool(config);

module.exports = pool;
