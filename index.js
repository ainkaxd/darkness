require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Создаём клиента
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

// Коллекции для команд и реакций
client.commands = new Collection();
client.reactions = new Collection();

// Загружаем команды
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(`[WARNING] Команда в ${filePath} не имеет data или execute.`);
  }
}

// Загружаем реакции
const reactionsPath = path.join(__dirname, 'reactions');
const reactionFiles = fs.readdirSync(reactionsPath).filter(file => file.endsWith('.js'));

for (const file of reactionFiles) {
  const reaction = require(path.join(reactionsPath, file));
  if (reaction.name && reaction.execute) {
    client.reactions.set(reaction.name, reaction);
  }
}

// Загружаем события
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Запуск
client.login(process.env.TOKEN);
