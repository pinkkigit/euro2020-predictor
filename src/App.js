import React from "react";
import Divider from "./components/Divider";
import Group from "./components/Group";

const App = () => {
  const groupNames = [
    "Group A",
    "Group B",
    "Group C",
    "Group D",
    "Group E",
    "Group F",
  ];

  return (
    <div className="site-container">
      <h2 className="site-header">EURO 2020 Simulator</h2>
      {groupNames.map((m) => (
        <div key={m}>
          <Divider>{m}</Divider>
          <Group name={m} />
        </div>
      ))}
    </div>
  );
};

export default App;
