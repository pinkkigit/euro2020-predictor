import React from "react";
import "../css/knockout.css";
import TeamFlag from "./TeamFlag";
import formatDate from "../utils/formatDate";

const KnockoutGame = ({ game }) => {
  return (
    <div className="game">
      <div className="game-vertical-flex">
        <div className="game-date">{formatDate(game.utcDate)}</div>
        <div className="game-horizontal-flex">
          <div className="game-flag">
            <TeamFlag url={game.homeTeam.crestUrl} />
          </div>
          <p className="game-team">
            <strong>{game.homeTeam.name}</strong>
          </p>
          <input className="game-input" />
        </div>
        <div className="game-horizontal-flex">
          <div className="game-flag">
            <TeamFlag url={game.awayTeam.crestUrl} />
          </div>
          <p className="game-team">
            <strong>{game.awayTeam.name}</strong>
          </p>
          <input className="game-input" />
        </div>
      </div>
    </div>
  );
};

export default KnockoutGame;
