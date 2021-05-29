import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamFlag from "./TeamFlag";
import { addResult } from "../reducers/matchReducer";
import { updateStandings } from "../reducers/standingReducer";

const GroupMatch = ({ match, breakpoint, width }) => {
  const dispatch = useDispatch();
  const standings = useSelector((state) => state.standings);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString().replaceAll("/", ".") +
      " " +
      date.toLocaleTimeString().slice(0, -3).replace(".", ":")
    );
  };

  const handleHomeInput = (event) => {
    const score = event.target.value === "" ? null : Number(event.target.value);
    const result = {
      ...match,
      score: {
        ...match.score,
        homeTeam: score,
      },
    };
    match.score.homeTeam = score;
    if (match.score.awayTeam !== null) {
      dispatch(addResult(result));
      setMatchStats(score, Number(match.score.awayTeam));
    }
  };

  const handleAwayInput = (event) => {
    const score = event.target.value === "" ? null : Number(event.target.value);
    const result = {
      ...match,
      score: {
        ...match.score,
        awayTeam: score,
      },
    };
    match.score.awayTeam = score;
    if (match.score.homeTeam !== null) {
      dispatch(addResult(result));
      setMatchStats(Number(match.score.homeTeam), score);
    }
  };

  const setMatchStats = (homeScore, awayScore) => {
    const group = standings.find((s) => s.group === match.group);

    const homeTeamToUpdate = group.table.find(
      (t) => t.team.id === match.homeTeam.id
    );
    const awayTeamToUpdate = group.table.find(
      (t) => t.team.id === match.awayTeam.id
    );

    if (homeTeamToUpdate.games.find((g) => g.id === match.id)) {
      homeTeamToUpdate.games = homeTeamToUpdate.games.filter(
        (g) => g.id !== match.id
      );
    }
    if (awayTeamToUpdate.games.find((g) => g.id === match.id)) {
      awayTeamToUpdate.games = awayTeamToUpdate.games.filter(
        (g) => g.id !== match.id
      );
    }

    const updatedHomeTeam = {
      ...homeTeamToUpdate,
      games: homeTeamToUpdate.games.concat({
        goalsFor: homeScore,
        goalsAgainst: awayScore,
        id: match.id,
      }),
    };

    const updatedAwayTeam = {
      ...awayTeamToUpdate,
      games: awayTeamToUpdate.games.concat({
        goalsFor: awayScore,
        goalsAgainst: homeScore,
        id: match.id,
      }),
    };

    const updatedTable = group.table.map((team) =>
      team === homeTeamToUpdate
        ? updatedHomeTeam
        : team === awayTeamToUpdate
        ? updatedAwayTeam
        : team
    );
    const updatedGroup = {
      ...group,
      table: updatedTable,
    };

    dispatch(updateStandings(updatedGroup));
  };

  return (
    <tbody>
      <tr>
        <td className="group-game-date">{formatDate(match.utcDate)}</td>
        {width > breakpoint ? (
          <td className="group-game-home">
            <strong>{match.homeTeam.name}</strong>
          </td>
        ) : (
          <td className="group-game-home">
            <strong>{match.homeTeam.shortName}</strong>
          </td>
        )}
        <td>
          <TeamFlag url={match.homeTeam.crestUrl} />
        </td>
        <td>
          <input
            type="number"
            min="0"
            max="99"
            onChange={(e) => handleHomeInput(e)}
          />
        </td>
        <td className="group-game-colon">:</td>
        <td>
          <input
            type="number"
            min="0"
            max="99"
            onChange={(e) => handleAwayInput(e)}
          />
        </td>
        <td>
          <TeamFlag url={match.awayTeam.crestUrl} />
        </td>
        {width > breakpoint ? (
          <td className="group-game-away">
            <strong>{match.awayTeam.name}</strong>
          </td>
        ) : (
          <td className="group-game-away">
            <strong>{match.awayTeam.shortName}</strong>
          </td>
        )}
      </tr>
    </tbody>
  );
};

export default GroupMatch;
