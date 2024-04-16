const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_KEY,
    database: "blog"
});

module.exports = db;
