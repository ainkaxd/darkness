const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../data/teams.json');

function readTeams() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return {};
  }
}

function saveTeams(teams) {
  fs.writeFileSync(filePath, JSON.stringify(teams, null, 2));
}

module.exports = { readTeams, saveTeams };
