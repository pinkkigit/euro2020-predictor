import React, { useEffect, useState } from "react";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { updateStandings } from "../reducers/standingReducer";
import TeamStanding from "./TeamStanding";

const GroupStandings = ({ name }) => {
  const [groupTable, setGroupTable] = useState([]);
  const dispatch = useDispatch();
  const standings = useSelector((state) => state.standings);
  const matches = useSelector((state) => state.matches);

  useEffect(() => {
    setGroupTable(standings.find((s) => s.group === name).table);
  }, [matches, dispatch]);

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

  const sortTeams = (a, b) => {
    if (a.points > b.points) {
      return -1;
    } else if (b.points > a.points) {
      return 1;
    } else {
      const playedEachOther = a.games.find((g) =>
        b.games.find((bg) => bg.id === g.id)
      );
      if (playedEachOther) {
        if (playedEachOther.goalsFor > playedEachOther.goalsAgainst) {
          return -1;
        } else if (playedEachOther.goalsAgainst > playedEachOther.goalsFor) {
          return 1;
        }
      }
      if (a.goalDifference > b.goalDifference) {
        return -1;
      } else if (b.goalDifference > a.goalDifference) {
        return 1;
      } else {
        if (a.goalsFor > b.goalsFor) {
          return -1;
        } else if (b.goalsFor > a.goalsFor) {
          return 1;
        } else {
          if (a.won > b.won) {
            return -1;
          } else if (b.won > a.won) {
            return 1;
          }
        }
      }
      return 0;
    }
  };

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
