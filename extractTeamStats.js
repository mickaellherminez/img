
function extractTeamStats(data) {
  let teamStats = {};

  function processMatch(match) {
    const team1 = match.children[0];
    const team2 = match.children[1];

    if (!teamStats[team1.team]) {
      teamStats[team1.team] = {
        nomDeLaTeam: team1.team,
        nombreDeMatchJoué: 0,
        NombreDePointTotal: 0,
        NombreDeVictoir: 0,
      };
    }

    if (!teamStats[team2.team]) {
      teamStats[team2.team] = {
        nomDeLaTeam: team2.team,
        nombreDeMatchJoué: 0,
        NombreDePointTotal: 0,
        NombreDeVictoir: 0,
      };
    }

    teamStats[team1.team].nombreDeMatchJoué += 1;
    teamStats[team2.team].nombreDeMatchJoué += 1;

    teamStats[team1.team].NombreDePointTotal += parseInt(team1.result);
    teamStats[team2.team].NombreDePointTotal += parseInt(team2.result);

    if (team1.winner) {
      teamStats[team1.team].NombreDeVictoir += 1;
    }

    if (team2.winner) {
      teamStats[team2.team].NombreDeVictoir += 1;
    }
  }

  function traverse(children) {
    children.forEach((child) => {
      if (
        child.children &&
        child.children.length === 2 &&
        "team" in child.children[0]
      ) {
        processMatch(child);
      } else if (child.children) {
        traverse(child.children);
      }
    });
  }

  traverse(data.children);

  return Object.values(teamStats);
}

const result = extractTeamStats(data);
console.log(result);
