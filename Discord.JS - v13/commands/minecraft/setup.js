const Discord = require('discord.js');
const bconfig = require('../../config.json')
const predb = require('quick.db')
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Sets Your IP and PORT")
        .addStringOption((option) =>
            option
                .setName("ip")
                .setDescription("Write The IP Of Your Minecraft Server")
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("port")
                .setDescription("Write The PORT Of Your Minecraft Server")
                .setRequired(true)
        ),
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

        await predb.set(`guild_${interaction.guild.id}_ip`, interaction.options.getString("ip"))
        await predb.set(`guild_${interaction.guild.id}_port`, interaction.options.getInteger("port"))

        let embedSetup = new Discord.MessageEmbed();
        embedSetup.setTitle(interaction.client.user.username)
        embedSetup.setURL(bconfig.websitelink)
        embedSetup.setDescription("Setup Panel Here :-")
        embedSetup.addFields([
            {
                "name": "IP",
                "value": "```" + `${interaction.options.getString("ip")}` + "```"
            },
            {
                "name": "PORT",
                "value": "```" + `${interaction.options.getInteger("port")}` + "```"
            }
        ])
        embedSetup.setColor("GREEN");
        embedSetup.setThumbnail(interaction.client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedSetup.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        embedSetup.setTimestamp();

        interaction.reply({
            embeds: [embedSetup]
        });
    }
}
