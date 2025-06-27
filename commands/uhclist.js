// 📁 commands/uhclist.js
const { SlashCommandBuilder } = require('discord.js');
const { updateTeamListMessage } = require('../pako-uhc/ui');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uhclist')
    .setDescription('для uhc'),

  async execute(interaction) {
    // Только ты или админ
    if (interaction.user.id !== '868771678400966667') {
      return interaction.reply({ content: '❌ иди нахуй', ephemeral: true });
    }

    const targetChannel = interaction.client.channels.cache.get('1388148020008189952');
    if (!targetChannel) {
      return interaction.reply({ content: '❌ Канал не найден.', ephemeral: true });
    }

    await updateTeamListMessage(targetChannel);
    await interaction.reply({ content: '✅ Сообщение со списком создано.', ephemeral: true });
  }
};
