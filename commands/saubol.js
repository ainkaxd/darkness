const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('saubol')
    .setDescription('будь здоров'),

  async execute(interaction) {
    await interaction.reply('рахмет');
  },
};
