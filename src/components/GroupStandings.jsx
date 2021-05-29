import React, { useEffect, useState } from "react";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { updateStandings } from "../reducers/standingReducer";
import TeamStanding from "./TeamStanding";
import sortTeams from "../utils/sortTeams";

const GroupStandings = ({ name }) => {
  const [groupTable, setGroupTable] = useState([]);
  const dispatch = useDispatch();
  const standings = useSelector((state) => state.standings);
  const matches = useSelector((state) => state.matches);

  useEffect(() => {
    setGroupTable(standings.find((s) => s.group === name).table);
  }, [matches]);

  useEffect(() => {
    const group = standings.find((s) => s.group === name);

    groupTable.forEach((team) => {
      team.goalsFor = 0;
      team.goalsAgainst = 0;
      team.goalDifference = 0;
      team.gamesPlayed = 0;
      team.won = 0;
      team.draw = 0;
      team.lost = 0;
      team.points = 0;

      team.games.forEach((game) => {
        if (game.goalsFor === null || game.goalsAgainst === null) {
          return;
        }
        team.goalsFor += game.goalsFor;
        team.goalsAgainst += game.goalsAgainst;
        team.goalDifference = team.goalsFor - team.goalsAgainst;

        if (game.goalsFor > game.goalsAgainst) {
          team.won++;
          team.points += 3;
        } else if (game.goalsAgainst > game.goalsFor) {
          team.lost++;
        } else {
          team.draw++;
          team.points++;
        }
        team.gamesPlayed++;
      });
    });

    const updatedGroup = {
      ...group,
      table: groupTable,
    };

    dispatch(updateStandings(updatedGroup));
  }, [groupTable]);

  return (
    <div className="group-standing-container">
      <table id="group-standings">
        <thead>
          <tr>
            <th></th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>G</th>
            <th>Pts</th>
          </tr>
        </thead>
        {groupTable
          .sort(sortTeams)
          .map((t, index) => {
            t.position = index + 1;
            return t;
          })
          .map((team) => (
            <TeamStanding key={team.team.id} team={team} />
          ))}
      </table>
    </div>
  );
};

export default GroupStandings;
