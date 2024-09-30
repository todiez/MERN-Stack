const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
} = require("../controllers/workoutController");

//create an router instance
const router = express.Router();

//GET all workouts
router.get("/", getAllWorkouts);

//GET a single workout
router.get("/:id", getSingleWorkout);

//POST a new workout
router.post("/", createWorkout);

//DELETE a workout
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a new workout" });
});

//UPDATE a  workout
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a new workout" });
});

module.exports = router;
