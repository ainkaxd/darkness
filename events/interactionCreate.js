const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  InteractionType,
} = require('discord.js');
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
        const modal = new ModalBuilder()
          .setCustomId('uhc_register_modal')
          .setTitle(interaction.customId === 'uhc_edit' ? 'Изменение состава' : 'Регистрация команды');

        const teammateInput = new TextInputBuilder()
          .setCustomId('teammate')
          .setLabel('Тиммейт (ID, не ник, пример: 8687...)')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(45);

        const teamNameInput = new TextInputBuilder()
          .setCustomId('team_name')
          .setLabel('Название команды')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(45);

        modal.addComponents(
          new ActionRowBuilder().addComponents(teammateInput),
          new ActionRowBuilder().addComponents(teamNameInput)
        );

        return await interaction.showModal(modal);
      }

      if (interaction.customId === 'uhc_cancel') {
        const teams = readTeams();
        delete teams[userId];
        saveTeams(teams);

        await interaction.reply({
          content: '❌ Вы вышли из турнира.',
          flags: 64 // same as ephemeral: true
        });

        const targetChannel = await interaction.guild.channels.fetch('1388148020008189952');
        await updateTeamListMessage(targetChannel);
      }
    }

    if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'uhc_register_modal') {
      const teamName = interaction.fields.getTextInputValue('team_name');
      const teammateInput = interaction.fields.getTextInputValue('teammate').replace(/[<@!>]/g, '');
      const userId = interaction.user.id;

      // Проверка teammateId на валидность (17-20 цифр)
      const isValidId = /^\d{17,20}$/.test(teammateInput);
      const teammateId = isValidId ? teammateInput : null;

      const teams = readTeams();
      teams[userId] = {
        name: teamName,
        leader: userId,
        teammate: teammateInput
      };
      saveTeams(teams);

      const mentions = [userId];
      let teammateDisplay = teammateInput;

      if (teammateId) {
        mentions.push(teammateId);
        teammateDisplay = `<@${teammateId}>`;
      }

      await interaction.reply({
        content: `✅ Команда **${teamName}** с <@${userId}> и ${teammateDisplay} зарегистрирована.`,
        flags: 64,
        allowedMentions: { users: mentions }
      });

      const targetChannel = await interaction.guild.channels.fetch('1388148020008189952');
      await updateTeamListMessage(targetChannel);
    }
  }
};
