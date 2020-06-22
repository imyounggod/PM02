//Подключение модулей
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');



//Объект приложения Express
const app = express();

//Установка движка представлений
app.set("view engine", "hbs");

//Парсер для данных
const urlencodedParser = bodyParser.urlencoded({extended: false});

//Обработчики маршрутов
app.get("/", function(req,res){
    //Отправка ответа
    res.send("<h1>Main page</h1>");
});

app.get("/about", function(req,res){
    res.send("<h1>About</h1>");
});

app.get("/contact", function(req,res){
    res.send("<h1>Contact</h1>");
});

//Прослушивание сервера
app.listen(3000);

