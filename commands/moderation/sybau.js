const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sybau')
    .setDescription('Заглушить участника в голосовом')
    .addUserOption(option =>
      option.setName('участник').setDescription('Кого замутить').setRequired(true)
    ),

  async execute(interaction) {
    const member = interaction.member;
    const hasRole = member.roles.cache.some(role => role.name.toLowerCase() === 'unlimited');
    if (!hasRole) {
      return interaction.reply({ content: '❌ У вас нет прав на использование этой команды.', ephemeral: true });
    }

    const targetUser = interaction.options.getUser('участник');
    const targetMember = interaction.guild.members.cache.get(targetUser.id);

    if (!targetMember || !targetMember.voice.channel) {
      return interaction.reply('❌ Участник не в голосовом канале или не найден.');
    }

    await targetMember.voice.setMute(true, 'Замутил через /sybau');
    await interaction.reply(`<@${targetUser.id}> сибау`);
  },
};
