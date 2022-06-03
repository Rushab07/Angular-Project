const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SeVeN Store application." });
});


db.sequelize.sync({ force:true }).then(() => {
    console.log("Drop and re-sync db.")
});

require("./app/routes/seller.routes")(app);
require("./app/routes/product.route")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});