const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const myConnection = require("express-myconnection");
const mysql = require("mysql2");

const abmRoutes = require("./api/routes/abm");
const usersRoutes = require("./api/routes/users");
const { application } = require("express");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(
  myConnection(mysql, {
    host: "localhost",
    user: "root",
    password: "root",
    database: "challenge_alkemi",
    port: 8889,
  })
);

app.use((req, res, next) => {
  res.header("Access-ControlAllow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requiested-With, Content-Type , Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/abm", abmRoutes);
app.use("/users", usersRoutes);

module.exports = app;
