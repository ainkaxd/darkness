const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ey')
    .setDescription('Разглушить участника в голосовом')
    .addUserOption(option =>
      option.setName('участник').setDescription('Кого размутить').setRequired(true)
    ),

  async execute(interaction) {
    const member = interaction.member;
    const hasRole = member.roles.cache.some(role => role.name.toLowerCase() === 'unlimited');
    if (!hasRole) {
      return interaction.reply({ content: '❌ У вас нет прав на использование этой команды.', ephemeral: true });
    }

    const targetUser = interaction.options.getUser('участник');
    const targetMember = interaction.guild.members.cache.get(targetUser.id);

    if (!targetMember) {
      return interaction.reply('❌ Участник не найден.');
    }

    await targetMember.voice.setMute(false, 'Размутил через /ey');
    await interaction.reply(`<@${targetUser.id}> ансибау`);
  },
};
