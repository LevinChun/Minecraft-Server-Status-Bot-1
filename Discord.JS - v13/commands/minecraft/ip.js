const Discord = require('discord.js');
const bconfig = require('../../config.json')
const predb = require('quick.db')
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ip")
        .setDescription("Shows Your IP and PORT"),
    async execute(interaction) {

        let mcIP = predb.get(`guild_${interaction.guild.id}_ip`) || "Not Setup"
        let mcPort = predb.get(`guild_${interaction.guild.id}_port`) || "Not Setup"

        // bot-perm
        if (!interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.EMBED_LINKS)) {

            interaction.reply({

                content: "Please Give Me **EMBED_LINKS** permission in this channel .",
                ephemeral: true,

            });
        }

        let embedIP = new Discord.MessageEmbed();
        embedIP.setTitle(interaction.client.user.username)
        embedIP.setURL(bconfig.websitelink)
        embedIP.setDescription("Your Minecraft Server IP & PORT Panel Here :-")
        embedIP.addFields([
            {
                "name": "IP",
                "value": "```" + `${mcIP}` + "```"
            },
            {
                "name": "PORT",
                "value": "```" + `${mcPort}` + "```"
            }
        ])
        embedIP.setColor("BLUE");
        embedIP.setThumbnail(interaction.client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedIP.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        embedIP.setTimestamp();

        interaction.reply({
            embeds: [embedIP]
        });
    }
}
