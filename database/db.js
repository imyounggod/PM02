// Подключение драйвера для работы с бд MySQL
const mysql = require("mysql2");
// Подключение файла с данными для подключения к бд
const dbConfig = require("../config/db.config.js");

// создаем соединение с нашей базой данных
const connection = mysql.createConnection({

// Создаем соединение с нашей базой данных
const connection = mysql.createPool({
    connectionLimit: 5,
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    dateStrings: dbConfig.dateStrings
});

//Проверка соединения
connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });
// Экспортируем  соединение
module.exports = connection;
