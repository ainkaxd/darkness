const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('saubol')
    .setDescription('саубол джига))'),
  async execute(interaction) {
    await interaction.reply('саубол!');
  },
};
