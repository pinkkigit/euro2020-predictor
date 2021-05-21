import React from "react";
import Standings from "../standings.json";
import "../index.css";
import TeamFlag from "./TeamFlag";

const GroupStandings = ({ name }) => {
  return (
    <div className="group-standing-container">
      <table id="group-standings">
        <tbody>
          <tr>
            <th>Team</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>G</th>
            <th>P</th>
          </tr>
        </tbody>
        {Standings.standings
          .filter((s) => s.group === name)
          .map((t) =>
            t.table.map((team) => (
              <tbody key={team.team.id}>
                <tr>
                  <td className="group-standings-team-and-flag">
                    <div>
                      <TeamFlag url={team.team.crestUrl} />
                    </div>
                    <div className="group-standings-team">
                      <strong>{team.team.name}</strong>
                    </div>
                  </td>
                  <td className="group-standings-goals">{team.won}</td>
                  <td className="group-standings-goals">{team.draw}</td>
                  <td className="group-standings-goals">{team.lost}</td>
                  <td className="group-standings-goals">
                    {team.goalsFor} - {team.goalsAgainst}
                  </td>
                  <td className="group-standings-goals">
                    <strong>{team.points}</strong>
                  </td>
                </tr>
              </tbody>
            ))
          )}
      </table>
    </div>
  );
};

export default GroupStandings;
