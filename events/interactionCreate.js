const { readTeams, saveTeams } = require('../pako-uhc/uhcStorage');
const { updateTeamListMessage } = require('../pako-uhc/ui');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (command) return command.execute(interaction, client);
    }

    if (interaction.isButton()) {
      const userId = interaction.user.id;

      if (interaction.customId === 'uhc_register' || interaction.customId === 'uhc_edit') {
        const modal = {
          title: interaction.customId === 'uhc_edit' ? 'Изменение состава' : 'Регистрация команды',
          custom_id: 'uhc_register_modal',
          components: [
            {
              type: 1,
              components: [{
                type: 4,
                custom_id: 'teammate',
                label: 'Тиммейт (@user)',
                style: 1,
                required: true
              }]
            },
            {
              type: 1,
              components: [{
                type: 4,
                custom_id: 'team_name',
                label: 'Название команды',
                style: 1,
                required: true
              }]
            }
          ]
        };
        return interaction.showModal(modal);
      }

      if (interaction.customId === 'uhc_cancel') {
        const teams = readTeams();
        delete teams[userId];
        saveTeams(teams);

        await interaction.reply({ content: '❌ Вы вышли из турнира.', ephemeral: true });

        const targetChannel = await interaction.guild.channels.fetch('1388148020008189952');
        await updateTeamListMessage(targetChannel);
      }
    }

    if (interaction.isModalSubmit() && interaction.customId === 'uhc_register_modal') {
      const teamName = interaction.fields.getTextInputValue('team_name');
      const teammate = interaction.fields.getTextInputValue('teammate');
      const teammateId = teammate.replace(/[<@!>]/g, '');
      const userId = interaction.user.id;

      const teams = readTeams();
      teams[userId] = {
        name: teamName,
        leader: userId,
        teammate: teammateId
      };
      saveTeams(teams);

      await interaction.reply({
        content: `✅ Команда **${teamName}** с <@${userId}> и <@${teammateId}> зарегистрирована.`,
        ephemeral: true
      });

      const targetChannel = await interaction.guild.channels.fetch('1388148020008189952');
      await updateTeamListMessage(targetChannel);
    }
  }
};
