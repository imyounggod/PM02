//Подключение модулей
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
//Объект приложения Express
const app = express();

//Установка движка представлений
app.set("view engine", "hbs");
//Обработка статических файлов
app.use(express.static(__dirname + "/public"));
//Парсер для данных
const urlencodedParser = bodyParser.urlencoded({extended: false});
//Объект движка представленией
const hbs = require("hbs");
//Частичные представления
hbs.registerPartials(__dirname + "/views/partials");
 
//Подключение к базе данных
const connection = mysql.createConnection({
  host: "mansur228.beget.tech",
  user: "mansur228_228",
  database: "mansur228_228",
  password: "FZ8H%LDg",
  port: "3306",
  dateStrings: 'date'
});


//Обработчики маршрутов

app.get("/", function(req,res){
  console.log("Переход на \"/\"")
  res.render("index.hbs"), {
  }
});

app.get("/plan", function(req,res){
  connection.query(`SELECT DISTINCT flight.id_flight, 
  (SELECT airport.title_airport FROM airport,flight WHERE airport.id_airport = flight.id_airsend) AS title_out,
  (SELECT airport.city FROM airport, flight WHERE airport.id_airport = flight.id_airsend) AS city_out,
  (SELECT airport.country FROM airport, flight WHERE airport.id_airport = flight.id_airsend) AS country_out,
  (SELECT airport.title_airport FROM airport, flight WHERE airport.id_airport = flight.id_aircoming) AS title_in,
  (SELECT airport.city FROM airport, flight WHERE airport.id_airport = flight.id_aircoming) AS city_in,
  (SELECT airport.country FROM airport, flight WHERE airport.id_airport = flight.id_aircoming) AS country_in,
  schedule.date_out, schedule.date_in 
  FROM flight, airport,schedule`,
    function(err, data) {
    if(err) return console.log(err);
    res.render("plan.hbs", {
      schedule: data
    });
    
  });
});

app.get("/about", function(req,res){
    res.render("about.hbs");
});

app.get("/contact", function(req,res){
    res.render("contact.hbs");
});
app.get("/public*", function (req, res) {
  res.redirect("/about");
});
//Прослушивание сервера
app.listen(3000);

