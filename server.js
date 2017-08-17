const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const expressValidator = require("express-validator");
const morgan = require("morgan");
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressValidator());

app.use(morgan("dev"));

app.use(routes);


app.listen(3000, function() {
  console.log("running");
})
