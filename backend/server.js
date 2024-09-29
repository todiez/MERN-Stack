const express = require("express");

//process.env object is globally available from .env file in a nodejs environment
require("dotenv").config();

//creates an express app and stores it in app
const app = express();

//this function is fired for every request that comes in
//"global middleware"
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//respond for incoming get requests
app.get("/", (req, res) => {
  //response
  res.json({ mssg: "Welcome to the app" });
});

//listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on port 3000");
});

process.env;
