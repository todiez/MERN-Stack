//mongodb itself is schemaless therefore mongoose is needed to create one
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    //first argument (describes how the Schema looks)
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  {
    //second argument for a timestamp
    timestamps: true,
  }
);

module.exports = mongoose.model("Workout", workoutSchema);

