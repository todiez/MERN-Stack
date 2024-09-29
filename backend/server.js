//process.env object is globally available from .env file in a nodejs environment
require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");

//creates an express app and stores it in app
const app = express();

//looks for the body of a request (Data for the server)
app.use(express.json());

//this function is fired for every request that comes in
//"global middleware"
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//grabs all different routes attached to the router and uses them on the app
app.use("/api/workouts", workoutRoutes);


//connect to Database, it's async and returns a promise
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests after the connection to the DB is etablished
    app.listen(process.env.PORT, () => {
      console.log("connected to data base & listening on port", process.env.PORT );
    });
  })
  .catch((error) => {
    console.log(error);
  });
