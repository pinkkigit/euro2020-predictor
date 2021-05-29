import React, { useEffect } from "react";
import Divider from "./components/Divider";
import { useDispatch, useSelector } from "react-redux";
import { initializeTeams } from "./reducers/teamReducer";
import { initializeMatches } from "./reducers/matchReducer";
import GroupMatches from "./components/GroupMatches";
import KnockoutGames from "./components/KnockoutGames";
import { initializeStandings } from "./reducers/standingReducer";

const App = () => {
  const groupNames = [
    "Group A",
    "Group B",
    "Group C",
    "Group D",
    "Group E",
    "Group F",
  ];

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(initializeTeams());
  //   dispatch(initializeMatches());
  //   dispatch(initializeStandings());
  // }, [dispatch]);

  return (
    <div className="container">
      <div className="site-container">
        <h2 className="site-header">EURO 2020 Predictor</h2>
        {groupNames.map((m) => (
          <div key={m}>
            <Divider>{m}</Divider>
            <GroupMatches name={m} />
          </div>
        ))}
        <KnockoutGames />
      </div>
    </div>
  );
};

export default App;
