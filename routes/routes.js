module.exports = function(app,db){
  app.get("/", function(req,res){
    console.log("Переход на \"/\"")
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
  app.get("/table", function(req,res){
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
        res.render("table.hbs", {
          schedule: data
        });
        
      });
    });

  
}

