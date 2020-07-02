
const db = require('./database/db');

let str = "";
it("Отправка запроса!", function(){
    var expectedResult = " 1 09:27:00 Муборак Муборак Худжанд Таджикистан SKY Чикаго США Boeing";

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
        data.forEach(function(data){
          str = ' ' + String(data.id_flight) + ' ' + data.time_in_road + ' ' + data.title_out + ' ' + data.title_out+ ' ' + data.city_out+ ' ' + data.country_out+ ' ' + data.title_in+ ' ' + data.city_in+ ' ' + data.country_in+ ' ' + data.title_air;
        });
        if(str!==expectedResult){
          throw new Error(`Expected ${expectedResult}, but got ${str}`);
        }
        db.end(function(err) {
          if (err) {
            return console.log("Ошибка: " + err.message);
          }
          console.log("Подключение закрыто");
        });
      });
      
});