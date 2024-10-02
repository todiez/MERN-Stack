import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  //react context is kind of a global state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    //fetch request to post new data to db
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        //headers is necessary to clarify that the conent is json
        "Content-Type": "application/json",
      },
    });
    //response after sending the post request
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
      console.log("New workout added");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label> Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label> Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}

      />
      <label> Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}

      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
