const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) =>{
    if(err) {
        console.log('Error de conexão:' +err);
    } else {
        console.log('Mysql Connected!')
    }
});

module.exports = connection;