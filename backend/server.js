//process.env object is globally available from .env file in a nodejs environment
require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");

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

//listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on port 3000");
});

process.env;
