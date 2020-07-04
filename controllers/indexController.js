module.exports.get = function (req, res) {
    if(req.query.where && req.query.date_out){
      res.redirect(`/table?where=${req.query.where}&date_out=${req.query.date_out}`);
    }
    res.render("index.hbs");
};
