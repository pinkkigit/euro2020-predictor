import React from "react";
import "../index.css";

const TeamFlag = ({ url }) => {
  return (
    <span>
      <img src={url} className="flag"></img>
    </span>
  );
};

export default TeamFlag;
