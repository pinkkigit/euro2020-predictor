import Standings from "../standings.json";

const standingReducer = (state = Standings, action) => {
  switch (action.type) {
    case "INIT_STANDINGS":
      return action.data;
    case "UPDATE_STANDINGS":
      const group = state.find((g) => g.group === action.data.group);
      const updatedGroup = {
        ...group,
        table: action.data.table,
      };
      return state.map((g) => (g !== group ? g : updatedGroup));
    default:
      return state;
  }
};

export const initializeStandings = () => {
  return {
    type: "INIT_STANDINGS",
    data: Standings,
  };
};

export const updateStandings = (group) => {
  return {
    type: "UPDATE_STANDINGS",
    data: group,
  };
};

export default standingReducer;
