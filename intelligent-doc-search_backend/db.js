const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,  
  
});

db.connect((err) => {
  if (err) console.error("Database Connection Failed!", err);
  else console.log("Connected to MySQL");
});

module.exports = db;
