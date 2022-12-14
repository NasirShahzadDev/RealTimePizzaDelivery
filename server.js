const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = 8000;
const app = express();
//routes

app.get("/", (req, res) => {
  res.render("home");
});

//set Templates
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//server listening
app.listen(PORT, () => {
  console.log(`Listening at PORT : ${PORT}`);
});
