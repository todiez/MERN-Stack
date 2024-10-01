import { useState, useEffect } from "react";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorktoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    //useEffect is fired at every render but I need it only once, so an empty array needed

    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");

      //parse the json response into something to work with, array of (workout) objects:
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setWorkouts(json);
      }
    };

    //main function inside use effect async is bad, therefore second function and calling it
    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      {<WorkoutForm />}
    </div>
  );
};

export default Home;
