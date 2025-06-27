const { SlashCommandBuilder } = require('discord.js');
const { createUHCRegistrationMessage } = require('./ui');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uhc-register')
    .setDescription('Создаёт сообщение регистрации для турнира UHC'),

  async execute(interaction) {
    const allowedRoleName = interaction.guild.roles.cache.get('1165307052445409280'); // 👈 Роль, которой разрешено

    const member = interaction.member;
    const hasAccess = member.roles.cache.some(role =>
      role.name.toLowerCase() === allowedRoleName.toLowerCase()
    );

    if (!hasAccess) {
      return interaction.reply({
        content: '❌ У вас нет доступа к этой команде.',
        ephemeral: true,
      });
    }

    await interaction.deferReply({ ephemeral: true });

    const channel = interaction.channel;
    await createUHCRegistrationMessage(channel);

    await interaction.editReply('🟢 Сообщение регистрации отправлено!');
  },
};
