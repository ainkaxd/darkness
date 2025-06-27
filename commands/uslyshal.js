const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uslyshal')
    .setDescription('родной))))))'),

  async execute(interaction) {
    await interaction.reply('https://i.pinimg.com/736x/c9/14/d9/c914d9a83a315de33c7527e4bbe113d1.jpg');
  },
};
