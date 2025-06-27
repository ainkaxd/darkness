const { EmbedBuilder } = require('discord.js');
const { readTeams } = require('./uhcStorage');

/** 🔄 Генерация списка команд */
function generateTeamList() {
  const teams = readTeams();
  if (Object.keys(teams).length === 0) return '❌ Пока никто не зарегистрирован.';

  return Object.values(teams)
    .map((team, i) => `**${i + 1}. ${team.name}** — <@${team.leader}> + <@${team.teammate}>`)
    .join('\n\n');
}

/** 📬 Создание или обновление embed-сообщения со списком команд */
async function updateTeamListMessage(channel) {
  const embed = new EmbedBuilder()
    .setTitle('🏆 Список команд на Pako UHC')
    .setDescription(generateTeamList())
    .setColor(0x00ff88)
    .setFooter({ text: 'Крики короли камбека' });

  const messages = await channel.messages.fetch({ limit: 10 });
  const existing = messages.find(msg =>
    msg.author.bot &&
    msg.embeds.length &&
    msg.embeds[0].title?.includes('Список команд на Pako UHC')
  );

  if (existing) {
    await existing.edit({ embeds: [embed] });
  } else {
    await channel.send({ embeds: [embed] });
  }
}

module.exports = {
  updateTeamListMessage
};
