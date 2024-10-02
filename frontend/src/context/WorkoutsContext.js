import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

//export for using in different files
export const WorkoutsContextProvider = ({ children }) => {
  //destructuring the children property from the props
  //children represents whatever is wrapped by Workouts..Provider, in this case the APP component (@index.js)
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    // component wrapper  || state/dispatch is used to make it dynamic for set/create
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
