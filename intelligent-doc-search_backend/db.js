const mysql = require("mysql2");

// ✅ Ensure DB_PORT is converted to a number
const pool = mysql.createPool({
  host: process.env.DB_HOST || "shuttle.proxy.rlwy.net",
  port: Number(process.env.DB_PORT) || 50821, // Convert to Number
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "ErJdesfqFqBmxDzahrmkuiUOiBLTCsex",
  database: process.env.DB_NAME || "railway",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();
module.exports = db;
