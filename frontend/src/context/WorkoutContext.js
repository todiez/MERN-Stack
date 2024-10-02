import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return { workouts: action.payload };
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  //children represents every components wrapped by the context provider

  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  dispatch({ type: "SET_WORKOUTS", payload: [{}, {}] });

  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};

export default WorkoutsContextProvider;
