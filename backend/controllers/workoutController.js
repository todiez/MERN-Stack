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

  //detect whicht fields are empty if not all are filled out
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  console.log("EmptyFields Array: ", emptyFields)
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  //adding a document to db
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  //checking if workout exists in DB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such workout" });
  }

  const deleteWorkout = await Workout.findOneAndDelete({ _id: id });
  //in mongodb the id is specified like _id, therefore the object is necessary

  //if singleWorout is null (not existent) fire this:
  if (!deleteWorkout) {
    return res.status(400).json({ error: "No such workout exists" });
    // return is necessary to abort here and don't fire the following code
  }

  res.status(200).json(deleteWorkout);
};

//PATCH a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  //checking if workout exists in DB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  //if singleWorout is null (not existent) fire this:
  if (!workout) {
    return res.status(400).json({ error: "No such workout exists" });
    // return is necessary to abort here and don't fire the following code
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
