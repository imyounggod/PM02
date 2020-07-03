const moment = require('moment');

//Все возможные маршруты маршруты 
module.exports = function(app,db){
  let order = {};
  app.get("/", function(req,res){
    console.log("Переход на \"/\"")
    if(req.query.where && req.query.date_out){
      res.redirect(`/table?where=${req.query.where}&date_out=${req.query.date_out}`);
    }
    res.render("index.hbs"), {
    }
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
  app.get("/search", function (req, res) {
    db.query(`SELECT DISTINCT flight.id_flight, flight.time_in_road,
      (SELECT airport.title_airport FROM airport,flight WHERE airport.id_airport = flight.id_airsend) AS title_out,
      (SELECT airport.city FROM airport, flight WHERE airport.id_airport = flight.id_airsend) AS city_out,
      (SELECT airport.country FROM airport, flight WHERE airport.id_airport = flight.id_airsend) AS country_out,
      (SELECT airport.title_airport FROM airport, flight WHERE airport.id_airport = flight.id_aircoming) AS title_in,
      (SELECT airport.city FROM airport, flight WHERE airport.id_airport = flight.id_aircoming) AS city_in,
      (SELECT airport.country FROM airport, flight WHERE airport.id_airport = flight.id_aircoming) AS country_in,
      schedule.date_out, schedule.date_in, (SELECT aircraft.title_aircraft FROM aircraft, flight WHERE aircraft.id_aircraft = flight.id_aircrf) as title_air 
      FROM flight, airport,schedule, aircraft`,
        function(err, data) {
        if(err) return console.log(err);
        res.render("search.hbs", {
          schedule: data
        });
        
      });
  });
  
  app.post("/ticket", function (req,res) {
    if(!req.body) return res.sendStatus(400);
    res.render("ticket.hbs",{
      data: req.body
    })    
  })

  app.post("/ticket/confirm",function (req,res) {
    if(!req.body) return res.sendStatus(400);
    if(req.body.bagg){

    }
    let query = `INSERT INTO baggage (small_baggage, big_baggage) VALUES (`;
    if(req.body.bagg){
      query+= `"True", `;
    }
    else{
      query+= `"False", `;
    }
    if(req.body.bagg2){
      query+= `"True")`;
    }
    else{
      query+= `"False")`;
    }
    db.query(query,function(err, data) {
      if(err) return console.log(err);})
    db.query("INSERT INTO client (`fio`,`series/number`,`id_b`) VALUES (?,?,(SELECT id_baggage FROM baggage ORDER BY id_baggage DESC LIMIT 1))",[String(req.body.fio),req.body.passport],function(err, data) {
      if(err) return console.log(err);})
    db.query("INSERT INTO ticket (`code_passenger`,`fio_passenger`,`number_fligt`,`number_place`,`row_num`,`class`,`time_ricket`) VALUES ((SELECT id_client FROM client ORDER BY id_client DESC LIMIT 1),?,?,?,?,?,?)",
    [req.body.fio,req.body.flight,req.body.place,req.body.row,req.body.class, moment(new Date()).format("YYYY-MM-DD")],function(err, data) {
      if(err) return console.log(err);})
    db.query("INSERT INTO orders (`id_fli`,`number_row`,`number_place`,`date`,`id_c`,`classmode`,`id_t`) VALUES (?,?,?,?,(SELECT id_client FROM client ORDER BY id_client DESC LIMIT 1),?,(SELECT id_ticket FROM ticket ORDER BY id_ticket DESC LIMIT 1))",
    [req.body.flight,req.body.row,req.body.place,req.body.date,req.body.class],function(err, data) {
      if(err) return console.log(err);})
    res.redirect("/");
  });

  app.get("/ticket/cancel",function (req,res) {
    res.redirect("/search");
  });

  app.get("/table", function(req,res){
    let where = req.query.where;
    let date_out = new Date(req.query.date_out);
    date_out = moment(date_out).format("YYYY-MM-DD");
    let query = `SELECT DISTINCT flight.id_flight, flight.time_in_road,
    (SELECT airport.title_airport FROM airport,flight WHERE airport.id_airport = flight.id_airsend) AS title_out,
    (SELECT airport.city FROM airport, flight WHERE airport.id_airport = flight.id_airsend) AS city_out,
    (SELECT airport.country FROM airport, flight WHERE airport.id_airport = flight.id_airsend) AS country_out,
    (SELECT airport.title_airport FROM airport, flight WHERE airport.id_airport = flight.id_aircoming) AS title_in,
    (SELECT airport.city FROM airport, flight WHERE airport.id_airport = flight.id_aircoming) AS city_in,
    (SELECT airport.country FROM airport, flight WHERE airport.id_airport = flight.id_aircoming) AS country_in,
    schedule.date_out, schedule.date_in, (SELECT aircraft.title_aircraft FROM aircraft, flight WHERE aircraft.id_aircraft = flight.id_aircrf) as title_air 
    FROM flight, airport,schedule, aircraft `;
    if(where && date_out){
      query+= `WHERE DATE_FORMAT(schedule.date_out,'%Y-%m-%d') = ? AND (SELECT airport.city FROM airport, flight WHERE airport.id_airport = flight.id_aircoming) = ?`;
    }
        db.query(query,[String(date_out),where ],
        function(err, data) {
        if(err) return console.log(err);
        res.render("table.hbs", {
          schedule: data
        });
        
      });
    }); 
}

