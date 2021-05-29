import Teams from "../teams.json";

const teamReducer = (state = Teams, action) => {
  switch (action.type) {
    case "INIT_TEAMS":
      return action.data;
    default:
      return state;
  }
};

export const initializeTeams = () => {
  return {
    type: "INIT_TEAMS",
    data: Teams,
  };
};

export default teamReducer;
