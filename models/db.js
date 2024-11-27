require('dotenv').config();
const mysql = require('mysql2');

// Set up the connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log(process.env.DB_USER);
  console.log(process.env.DB_HOST);

module.exports = pool.promise();
