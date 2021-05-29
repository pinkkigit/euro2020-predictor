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

export default sortTeams;
