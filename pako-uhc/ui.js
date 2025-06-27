const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { readTeams } = require('./uhcStorage');

function generateTeamList() {
  const teams = readTeams();
  if (Object.keys(teams).length === 0) return '❌ Пока никто не зарегистрирован.';

  return Object.values(teams)
    .map((team, i) => `**${i + 1}. ${team.name}** — <@${team.leader}> + <@${team.teammate}>`)
    .join('\n');
}

async function createUHCRegistrationMessage(channel) {
  const embed = new EmbedBuilder()
    .setTitle('🏆 Регистрация на Pako UHC турнир')
    .setDescription(generateTeamList())
    .setColor(0x00ff88)
    .setFooter({ text: 'Нажмите кнопку ниже, чтобы зарегистрировать команду' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('uhc_register')
      .setLabel('📥 Зарегистрироваться')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('uhc_edit')
      .setLabel('🔁 Изменить состав')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('uhc_cancel')
      .setLabel('❌ Удалить команду')
      .setStyle(ButtonStyle.Danger),
  );

  await channel.send({ embeds: [embed], components: [row] });
}

module.exports = { createUHCRegistrationMessage };
