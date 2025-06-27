require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('🔁 Обновление слэш-команд...');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log('✅ Команды успешно обновлены.');
  } catch (error) {
    console.error(error);
  }
})();
