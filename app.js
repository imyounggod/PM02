//Подключение модулей
const express = require('express');
const bodyParser = require('body-parser');
//Объект приложения Express
const app = express();

//Установка движка представлений
app.set("view engine", "hbs");

//Парсер для данных
const urlencodedParser = bodyParser.urlencoded({extended: false});


const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "mansur228.beget.tech",
  user: "mansur228_228",
  database: "mansur228_228",
  password: "FZ8H%LDg",
  port: "3306"
});

// тестирование подключения



//Обработчики маршрутов
app.get("/", function(req,res){
  connection.query("SELECT aircraft.title_aircraft, airport.title_airport FROM flight, aircraft, airport", function(err, data) {
    if(err) return console.log(err);
    res.render("index.hbs", {
        flight: data
    });
  });
});

app.get("/about", function(req,res){
    res.send("<h1>About</h1>");
});

app.get("/contact", function(req,res){
    res.send("<h1>Contact</h1>");
});

//Прослушивание сервера
app.listen(3000);

