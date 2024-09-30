const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//GET all workouts
const getAllWorkouts = async (req, res) => {
  const allWorkouts = await Workout.find({
    //to find all workouts just leave this blank instead of inserting a filter criteria
  }).sort({ createdAt: -1 });

  res.status(200).json(allWorkouts);
};

//GET a single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  //checking if workout exists in DB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const singleWorkout = await Workout.findById(id);

  //if singleWorout is null (not existent) fire this:
  if (!singleWorkout) {
    return res.status(404).json({ error: "No such workout exists" });
    // return is necessary to abort here and don't fire the following code
  }

  res.status(200).json(singleWorkout);
};

//Create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  //adding a document to db
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a workout

//PATCH a workout

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
};
