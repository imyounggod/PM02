const indexController = require("../controllers/indexController.js");
const aboutController = require("../controllers/aboutController.js");
const contactController = require("../controllers/contactController.js");
const tableController = require("../controllers/tableController.js");
const searchController = require("../controllers/searchController.js");
const ticketController = require("../controllers/ticketController.js");
//Все возможные маршруты  
module.exports = function(app){

  app.route("/").get(indexController.get);
  app.route("/about").get(aboutController.get);
  app.route("/contact").get(contactController.get);
  app.route("/table").get(tableController.get);
  app.route("/search").get(searchController.get);
  app.route("/ticket").post(ticketController.post);
  app.route("/ticket/confirm").post(ticketController.confirm);
  app.route("/ticket/cancel").get(ticketController.cancel);
  
}
