import React from "react";
import TeamFlag from "./TeamFlag";

const TeamStanding = ({ team }) => {
  if (team.gamesPlayed > 0) {
    console.log(team);
  }
  return (
    <tbody>
      <tr>
        <td>
          <span className="group-standings-team-and-flag">
            <TeamFlag url={team.team.crestUrl} />
            <span className="group-standings-team">
              <strong>{team.team.name}</strong>
            </span>
          </span>
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
  );
};

export default TeamStanding;
