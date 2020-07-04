//Подключение модулей
const express     = require('express');
const bodyParser  = require('body-parser');
//Объект приложения Express
const app         = express();
//Установка движка представлений
app.set("view engine", "hbs");
//Обработка статических файлов
app.use(express.static(__dirname + "/public"));
//Парсер для данных
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
//Объект движка представленией
const hbs = require("hbs");
//Частичные представления
hbs.registerPartials(__dirname + "/views/partials");

//Обработчики маршрутов
const routes = require('./routes/routes')(app);
//Прослушивание сервера
app.listen(process.env.PORT || 3000,()=>{
  console.log("Сервер запущен");
});
