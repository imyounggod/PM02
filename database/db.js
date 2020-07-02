const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// создаем соединение с нашей базой данных
const connection = mysql.createConnection({
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

module.exports = connection;
//экспортируем  соединение