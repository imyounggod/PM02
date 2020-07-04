// Подключение драйвера для работы с бд MySQL
const mysql = require("mysql2");
// Подключение файла с данными для подключения к бд
const dbConfig = require("../config/db.config.js");

// Создаем соединение с нашей базой данных
const connection = mysql.createPool({
    connectionLimit: 20,
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    dateStrings: dbConfig.dateStrings
});

// Экспортируем  соединение
module.exports = connection;
