import { createStore, combineReducers } from "redux";
import teamReducer from "./reducers/teamReducer";
import matchReducer from "./reducers/matchReducer";
import standingReducer from "./reducers/standingReducer";

const reducer = combineReducers({
  teams: teamReducer,
  matches: matchReducer,
  standings: standingReducer,
});

const store = createStore(reducer);

export default store;
