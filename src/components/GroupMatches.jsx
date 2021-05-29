import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GroupMatch from "./GroupMatch";
import GroupStandings from "./GroupStandings";

const GroupMatches = ({ name }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const matches = useSelector((state) => state.matches);

  const breakpoint = 900;
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <div className="group-flex-container">
      <div className="group-games">
        <table>
          {matches.map(
            (match) =>
              match.group === name && (
                <GroupMatch
                  key={match.id}
                  match={match}
                  breakpoint={breakpoint}
                  width={width}
                />
              )
          )}
        </table>
      </div>
      <GroupStandings name={name} />
    </div>
  );
};

export default GroupMatches;
