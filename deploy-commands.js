require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

// 🔁 Рекурсивный обход команд
function getAllCommandFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllCommandFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.js')) {
      arrayOfFiles.push(fullPath);
    }
  }
  return arrayOfFiles;
}

const commands = [];
const commandFiles = getAllCommandFiles(path.join(__dirname, 'commands'));

for (const file of commandFiles) {
  const command = require(file);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`[⚠️] Пропущен файл без data/execute: ${file}`);
  }
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
