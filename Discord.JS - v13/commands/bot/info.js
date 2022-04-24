const Discord = require('discord.js');
const bconfig = require('../../config.json')
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Gives My Info"),
    async execute(interaction) {

        // bot-perm
        if (!interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.EMBED_LINKS)) {

            interaction.reply({

                content: "Please Give Me **EMBED_LINKS** permission in this channel .",
                ephemeral: true,

            });
        }

        const row1 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Language - JS")
                    .setStyle('LINK')
                    .setURL("https://www.javascript.com"),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Platform - NodeJS")
                    .setStyle('LINK')
                    .setURL("https://nodejs.org/en"),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Library - Discord.JS")
                    .setStyle('LINK')
                    .setURL(bconfig.botinvitelink),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Packages - NPM")
                    .setStyle('LINK')
                    .setURL("https://www.npmjs.com"),
            )

        const row2 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Api - Mcsrvstat")
                    .setStyle('LINK')
                    .setURL("https://api.mcsrvstat.us"),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Databse - Quick.db")
                    .setStyle('LINK')
                    .setURL("https://quickdb.js.org"),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Website")
                    .setStyle('LINK')
                    .setURL(bconfig.websitelink),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Docs Website")
                    .setStyle('LINK')
                    .setURL(bconfig.docswebsitelink),
            )

        const row3 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("FAQ'S")
                    .setStyle('LINK')
                    .setURL(bconfig.faqswebsitelink),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Github")
                    .setStyle('LINK')
                    .setURL("https://github.com/LOG-LEGENDX/Minecraft-Server-Status-Bot"),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Privacy")
                    .setStyle('LINK')
                    .setURL("https://github.com/LOG-LEGENDX/Minecraft-Server-Status-Bot/blob/master/PRIVACY.md"),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Terms Of Services")
                    .setStyle('LINK')
                    .setURL("https://github.com/LOG-LEGENDX/Minecraft-Server-Status-Bot/blob/master/TOS.md"),
            )

        interaction.reply({
            components: [row1, row2, row3]
        });
    }
}