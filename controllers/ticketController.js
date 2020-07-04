const db = require('../database/db');  

module.exports.post = function (req, res) {
    if(!req.body) return res.sendStatus(400);
    res.render("ticket.hbs",{
      data: req.body
    })  
};

module.exports.confirm = function (req, res){
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
};

module.exports.cancel = function (req, res) {
    res.redirect("/search");
};

