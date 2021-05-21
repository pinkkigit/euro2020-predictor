import React, { useEffect } from "react";
import Matches from "../matches.json";
import GroupStandings from "./GroupStandings";
import TeamFlag from "./TeamFlag";

const Group = ({ name }) => {
  const [width, setWidth] = React.useState(window.innerWidth);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString().replaceAll("/", ".") +
      " " +
      date.toLocaleTimeString().slice(0, -3).replace(".", ":")
    );
  };

  return (
    <div className="group-flex-container">
      <div className="group-games">
        <table>
          {Matches.matches.map(
            (m) =>
              m.group === name && (
                <tbody key={m.id}>
                  <tr>
                    <td className="group-game-date">{formatDate(m.utcDate)}</td>
                    {width > breakpoint ? (
                      <td className="group-game-home">
                        <strong>{m.homeTeam.name}</strong>
                      </td>
                    ) : (
                      <td className="group-game-home">
                        <strong>{m.homeTeam.shortName}</strong>
                      </td>
                    )}
                    <td>
                      <TeamFlag url={m.homeTeam.crestUrl} />
                    </td>
                    <td>
                      <input type="number" min="0" max="99" />
                    </td>
                    <td className="group-game-colon">:</td>
                    <td>
                      <input></input>
                    </td>
                    <td>
                      <TeamFlag url={m.awayTeam.crestUrl} />
                    </td>
                    {width > breakpoint ? (
                      <td className="group-game-away">
                        <strong>{m.awayTeam.name}</strong>
                      </td>
                    ) : (
                      <td className="group-game-away">
                        <strong>{m.awayTeam.shortName}</strong>
                      </td>
                    )}
                  </tr>
                </tbody>
              )
          )}
        </table>
      </div>
      <GroupStandings name={name} />
    </div>
  );
};

export default Group;
