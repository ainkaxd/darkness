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
      .setTitle('🧨 Pako UHC — регистрация открыта!')
      .setDescription(
        `> *p.s. Для тех, кто в танке: это **Ultra Hardcore** режим в Minecraft — буквально как **Голодные Игры***\n\n` +
        `🎯 **Формат:**\n` +
        `• Команды по **2 человека**\n` +
        `• **PvP**, **выживание**, **одно сердце — один шанс**\n` +
        `• Подробные **правила**, **версия** и **награды** будут публиковаться чуть позже\n\n` +
        `📥 Чтобы зарегистрироваться — нажмите кнопку **«Регистрация»** ниже и заполните форму.\n\n`
      )
      .setColor(0xff4d4d)
      .setTimestamp()
      .setFooter({ text: 'Pako UHC Registration' });

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
