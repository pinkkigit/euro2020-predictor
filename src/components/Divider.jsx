import React from "react";
import "../index.css";

const Divider = ({ children }) => {
  return (
    <div className="divider-container">
      <div className="divider-border" />
      <span className="divider-content">
        <h3>{children}</h3>
      </span>
      <div className="divider-border" />
    </div>
  );
};

export default Divider;
