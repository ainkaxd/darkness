const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dota')
    .setDescription('+5 дота'),

  async execute(interaction) {
    await interaction.reply('го доту <@421250527767035906> <@571175795209535508> <@868771678400966667> <@391232741687164928> <@392264789360902156> <@490425986257649664> <@526296776270151681>');
  },
};
