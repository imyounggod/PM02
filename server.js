//Подключение модулей
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db.config');
//Объект приложения Express
const app = express();

//Установка движка представлений
app.set("view engine", "hbs");
//Обработка статических файлов
app.use(express.static(__dirname + "/public"));
//Парсер для данных
app.use(bodyParser.urlencoded({extended: true}));
//Объект движка представленией
const hbs = require("hbs");
//Частичные представления
hbs.registerPartials(__dirname + "/views/partials");
 
//Подключение к базе данных
const connection = require('./database/db');   
//Обработчики маршрутов
const routes = require('./routes/routes')(app,connection);
//Прослушивание сервера
app.listen(process.env.PORT || 8000,()=>{
  console.log("Сервер запущен");
});
