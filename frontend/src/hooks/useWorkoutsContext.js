import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  //this hook returns the value of the context which we passed into the provides component
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error("useWorkoutsContext must be used inside an Context Provider");
  }

  return context;
};
