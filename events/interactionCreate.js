module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Ошибка при выполнении команды ${interaction.commandName}:`, error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: '❌ Произошла ошибка при выполнении команды.', ephemeral: true });
        } else {
          await interaction.reply({ content: '❌ Произошла ошибка при выполнении команды.', ephemeral: true });
        }
      }
    }

    // (в будущем: interaction.isButton(), interaction.isSelectMenu(), и т.д.)
  },
};
