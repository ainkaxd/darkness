const { SlashCommandBuilder } = require('discord.js');

const reactionData = {
  virt: {
    label: 'Виртить',
    gif: 'https://c.tenor.com/tmtIYS8Z8PIAAAAC/tenor.gif',
    format: (u1, u2) => `${u1} и ${u2}, повиртили`,
  },
  kiss: {
    label: 'Поцеловать',
    gif: 'https://c.tenor.com/JWkoHZezNMgAAAAC/tenor.gif',
    format: (u1, u2) => `${u1} и ${u2}, поцеловались`,
  },
  fuck: {
    label: 'Трахнуть',
    gif: 'https://c.tenor.com/FmBSx-Wr1QgAAAAd/tenor.gif',
    format: (u1, u2) => `${u1} и ${u2}, поебались`,
  },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reaction')
    .setDescription('Отправить реакцию')
    .addStringOption(option =>
      option.setName('действие').setDescription('Выберите действие').setRequired(true)
        .addChoices(
          { name: 'Виртить', value: 'virt' },
          { name: 'Поцеловать', value: 'kiss' },
          { name: 'Трахнуть', value: 'fuck' }
        ))
    .addUserOption(option =>
      option.setName('участник').setDescription('Кого упомянуть').setRequired(true)
    ),

  async execute(interaction) {
    const action = interaction.options.getString('действие');
    const target = interaction.options.getUser('участник');
    const author = interaction.user;

    const reaction = reactionData[action];
    if (!reaction) {
      return interaction.reply({ content: 'Неизвестная реакция.', ephemeral: true });
    }

    const embed = {
      title: `Реакция: ${reaction.label}`,
      description: reaction.format(`<@${author.id}>`, `<@${target.id}>`),
      image: { url: reaction.gif },
      color: 0xff77aa,
    };

    await interaction.reply({ embeds: [embed] });
  },
};
