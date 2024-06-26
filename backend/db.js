const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_KEY,
    database: process.env.DB_DBNAME
});

module.exports = db;
