const Discord = require('discord.js');
const bconfig = require('../../config.json')
const predb = require('quick.db')
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reset")
        .setDescription("Resets Your IP and PORT"),
    async execute(interaction) {

        // bot-perm
        if (!interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.EMBED_LINKS)) {

            interaction.reply({

                content: "Please Give Me **EMBED_LINKS** permission in this channel .",
                ephemeral: true,

            });
        }
        //user-perm
        if (!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) {

            interaction.reply({

                content: "Make Sure You Have **MANAGE_SERVER** permission to use this command .",
                ephemeral: true,

            });
        }

        await predb.delete(`guild_${interaction.guild.id}_ip`)
        await predb.delete(`guild_${interaction.guild.id}_port`)

        let embedReset = new Discord.MessageEmbed();
        embedReset.setTitle(interaction.client.user.username)
        embedReset.setURL(bconfig.websitelink)
        embedReset.setDescription("Reset Panel Here :-")
        embedReset.addFields([
            {
                "name": "IP",
                "value": "```" + `Successfully Reset` + "```"
            },
            {
                "name": "PORT",
                "value": "```" + "Successfully Reset" + "```"
            }
        ])
        embedReset.setColor("GREEN");
        embedReset.setThumbnail(interaction.client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedReset.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        embedReset.setTimestamp();

        interaction.reply({
            embeds: [embedReset]
        });
    }
}
