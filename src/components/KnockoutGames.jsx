import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sortTeams from "../utils/sortTeams";

const KnockoutGames = () => {
  const [teams, setTeams] = useState([]);
  const [thirdTeams, setThirdTeams] = useState([]);
  const dispatch = useDispatch();
  const standings = useSelector((state) => state.standings);
  const matches = useSelector((state) => state.matches);

  useEffect(() => {
    let topTwoTeams = [];
    let thirdPlaceTeams = [];
    standings.forEach((s) => {
      topTwoTeams = topTwoTeams.concat(s.table.filter((t) => t.position < 3));
      thirdPlaceTeams = thirdPlaceTeams.concat(
        s.table.filter((t) => t.position === 3)
      );
    });
    setTeams(topTwoTeams);
    setThirdTeams(thirdPlaceTeams.sort(sortTeams).slice(0, 4));
  }, [standings]);

  return (
    <>
      {teams.map((t) => (
        <p key={t.team.id}>{t.team.name}</p>
      ))}
      <h1>3rd place teams</h1>
      {thirdTeams.map((t) => (
        <p key={t.team.id}>{t.team.name}</p>
      ))}
    </>
  );
};

export default KnockoutGames;
