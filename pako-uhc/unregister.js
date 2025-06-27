const { readTeams, saveTeams } = require('./uhcStorage');
const { createUHCRegistrationMessage } = require('./ui');

async function unregisterTeam(userId, channel) {
  const teams = readTeams();
  delete teams[userId];
  saveTeams(teams);
  await createUHCRegistrationMessage(channel);
}

module.exports = { unregisterTeam };
