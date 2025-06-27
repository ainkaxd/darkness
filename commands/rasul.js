const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rasul')
    .setDescription('расул'),

  async execute(interaction) {
    await interaction.reply({
      content: 'https://media.discordapp.net/attachments/1031179667736113222/1057272555993571378/2022-11-06_214049.png'
    });
  },
};
