const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// создаем соединение с нашей базой данных
const connection = mysql.createPool({
    connectionLimit: 5,
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    dateStrings: dbConfig.dateStrings
});

// открываем  соединение с базой данных
/*connection.connect(err => {
if (err) throw error;
console.log("успешно соединено с базой данных");
});*/

module.exports = connection;
//экспортируем  соединение