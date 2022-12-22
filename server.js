require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const { MONGO_URL } = require("./app/config/credentials");
const session = require("express-session");
//an HTTP server-side framework used to create and manage a session middleware.
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");
const { dbConnect } = require("./app/config/dbConnection");
const PORT = 8000;
const app = express();

//Database Connection
dbConnect();

//session configuration
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    //to store cookies in database
    store: new MongoDbStore({
      mongoUrl: MONGO_URL,
      collectionName: "sessions",
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 24 * 24 * 60 }, //24 hours
    // cookie: { maxAge: 1000 * 24 }, //15 Seconds
  })
);

//passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash()); // used to

//define routes
const WebRouter = require("./routes/web");
// const ApiRouter = require("./routes/api");

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  res.locals.orders = req.orders;
  next();
});

//set Templates
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//routes
app.use("/", WebRouter);
// app.use("/api", ApiRouter);

//server listening
app.listen(PORT, () => {
  console.log(`Listening at PORT : ${PORT}`);
});
