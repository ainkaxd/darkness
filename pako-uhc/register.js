const { SlashCommandBuilder } = require('discord.js');
const { updateTeamListMessage } = require('../pako-uhc/ui');
const { readTeams, saveTeams } = require('../pako-uhc/uhcStorage');

const registrationChannelId = '1392578527290724475';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uhc-register')
    .setDescription('Регистрирует тебя и тиммейта в команду для Pako UHC')
    .addUserOption(option =>
      option.setName('teammate')
        .setDescription('Выбери тиммейта')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('teamname')
        .setDescription('Введите название команды')
        .setRequired(true)
    ),

  async execute(interaction) {
    const requiredRoleId = '1165307052445409280';
    const member = interaction.member;

    if (!member.roles.cache.has(requiredRoleId)) {
      return interaction.reply({
        content: '❌ У вас нет доступа к этой команде.',
        ephemeral: true,
      });
    }

    const userId = interaction.user.id;
    const teammate = interaction.options.getUser('teammate');
    const teamName = interaction.options.getString('teamname');

    if (!teammate || teammate.bot) {
      return interaction.reply({
        content: '❌ Указан недопустимый тиммейт',
        ephemeral: true,
      });
    }

    const teams = readTeams();

    const alreadyRegistered = Object.values(teams).some(team =>
      team.leader === userId || team.teammate === userId ||
      team.leader === teammate.id || team.teammate === teammate.id
    );

    if (alreadyRegistered) {
      return interaction.reply({
        content: '❌ Ты или твой тиммейт уже зарегистрированы в другой команде.',
        ephemeral: true,
      });
    }

    const teamId = `${userId}-${teammate.id}`;
    teams[teamId] = {
      name: teamName,
      leader: userId,
      teammate: teammate.id
    };

   saveTeams(teams);


    const channel = await interaction.guild.channels.fetch(registrationChannelId);
    await updateTeamListMessage(channel);

    return interaction.reply({
      content: `✅ Команда **${teamName}** зарегистрирована: <@${userId}> + <@${teammate.id}>`,
      ephemeral: true,
    });
  }
};
