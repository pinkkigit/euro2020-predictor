import Matches from "../matches.json";

const matchReducer = (state = Matches, action) => {
  switch (action.type) {
    case "INIT_MATCHES":
      return action.data;
    case "ADD_RESULT":
      const matchToUpdate = state.find((m) => m.id === action.data.id);
      const updatedMatch = {
        ...matchToUpdate,
        ...action.data,
      };
      return state.map((match) =>
        match.id !== action.data.id ? match : updatedMatch
      );
    default:
      return state;
  }
};

export const initializeMatches = () => {
  return {
    type: "INIT_MATCHES",
    data: Matches,
  };
};

export const addResult = (result) => {
  return {
    type: "ADD_RESULT",
    data: result,
  };
};

export default matchReducer;
