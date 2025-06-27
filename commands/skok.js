const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skok')
    .setDescription('скок у тя см?'),

  async execute(interaction) {
    const number = Math.floor(Math.random() * 100) + 1;
    await interaction.reply(`у тя **${number}** см`);
  },
};
