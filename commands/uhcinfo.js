const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uhcinfo')
    .setDescription('Отправляет embed сообщение о Pako UHC с кнопками'),

  async execute(interaction) {
    // 🔒 Проверка роли "Шоумен" (ID: 1165307052445409280)
    if (!interaction.member.roles.cache.has('1165307052445409280')) {
      return interaction.reply({
        content: '❌ У вас нет прав использовать эту команду.',
        ephemeral: true
      });
    }

    // 📦 Embed
    const embed = new EmbedBuilder()
      .setTitle('🧨 Pako UHC 2 — снова тут джиги!')
      .setDescription(
        `> *12 июля в 21:00*\n`+
        `> *1.8.9*\n`+
        `> *микрофон 18+*\n`  
      )
      .setColor(0xff4d4d)
      .setTimestamp()
      .setFooter({ text: 'uhc 2 ура!' });

    // 🎛 Кнопки
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('uhc_register')
        .setLabel('📝 Регистрация')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('uhc_edit')
        .setLabel('✏️ Изменить состав')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('uhc_cancel')
        .setLabel('❌ Отменить участие')
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  }
};
