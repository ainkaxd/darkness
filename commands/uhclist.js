const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uhclist')
    .setDescription('для uhc'),

  async execute(interaction) {
    const { updateTeamListMessage } = require('../pako-uhc/ui'); // ⬅️ импорт ВНУТРИ функции

    if (interaction.user.id !== '868771678400966667') {
      return interaction.reply({ content: '❌ иди нахуй', ephemeral: true });
    }

    const targetChannel = interaction.client.channels.cache.get('1392578527290724475');
    if (!targetChannel) {
      return interaction.reply({ content: '❌ Канал не найден.', ephemeral: true });
    }

    await updateTeamListMessage(targetChannel);
    await interaction.reply({ content: '✅ Сообщение со списком создано.', ephemeral: true });
  }
};
