const Discord = require('discord.js');
const bconfig = require('../../config.json')
const predb = require('quick.db')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Shows Your Server Status")
        .addStringOption((option) =>
            option
                .setName("type")
                .setDescription("Write The TYPE Of Your Minecraft Server : java/bedrock")
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

        let mcIP = predb.get(`guild_${interaction.guild.id}_ip`) || "Not Setup"
        let mcPort = predb.get(`guild_${interaction.guild.id}_port`) || "Not Setup"

        let embedstatuserr = new Discord.MessageEmbed()
        embedstatuserr.setDescription(`
        • Maybe, IP and PORT Has Been Not Setuped For This Server .
        • If you thought that bot is giving wrong reply then use **/reset** for reset and then **/setup** command for setup your server ip and port again`)
        embedstatuserr.setColor('RED')
        embedstatuserr.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
        embedstatuserr.setTimestamp()

        if (!predb.has(`guild_${interaction.guild.id}_ip`)) {

            interaction.reply({

                embeds: [embedstatuserr]

            });
        }
        if (!predb.has(`guild_${interaction.guild.id}_port`)) {

            interaction.reply({

                embeds: [embedstatuserr]

            });
        }

        let embederr = new Discord.MessageEmbed()
        embederr.setDescription(`
        • Your Server Is Not Reachable , Here Are Possible Reasons -

        • Your IP/PORT Is Wrong .

        • Your Minecraft Server Is Offline .

        • Your Minecraft Server Query Is False .
        `)
        embederr.setColor('RED')
        embederr.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
        embederr.setTimestamp()

        let serverURL;

        if (interaction.options.getString("type") === "java") {

            serverURL = `https://api.mcsrvstat.us/2/${mcIP}:${mcPort}`;

        }
        else if (interaction.options.getString("type") === "bedrock") {

            serverURL = `https://api.mcsrvstat.us/bedrock/2/${mcIP}:${mcPort}`;
        }

        try {

            await fetch(serverURL)
                .then(res => res.json())
                .then(data => {

                    let status = "Offline"
                    let color = bconfig.botoldcolor
                    let attachment = new Discord.MessageAttachment(interaction.client.user.displayAvatarURL({ format: "png", size: 64, dynamic: true }), "icon.png")
                    let motd = "A Minecraft Server"
                    let players = "Currently Players Are Hidden On This Server , For More Info See https://faqs.log-network.me Of Minecraft Server Status Discord Bot"
                    let onlineplayers = 0
                    let maxplayers = 0

                    if (data.online === true) {

                        status = "Online"
                        color = bconfig.botnewcolor

                        if (data.icon) {
                            attachment = new Discord.MessageAttachment(Buffer.from(data.icon.substr('data:image\/png;base64,'.length), 'base64'), "icon.png")
                        }

                        if (data.motd.clean) {
                            motd = data.motd.clean
                        }

                        if (data.players.online !== 0) {

                            onlineplayers = data.players.online
                        }

                        if (data.players.max !== 0) {

                            maxplayers = data.players.max
                        }

                        if (data.players.list !== undefined) {

                            if (data.players.list === null) {

                                players = "No One Is Currently Playing On This Server"
                            }
                            else if (data.players.list !== null) {

                                if (data.players.list > 10) {

                                    players = "More Than 10 Players Are Playing , Cant List Them"
                                }
                                else if (data.players.list < 10) {

                                    players = data.players.list.join(" , ")
                                }

                            }
                        }
                    }

                    let embedStatus = new Discord.MessageEmbed();
                    embedStatus.setTitle(interaction.client.user.username)
                    embedStatus.setURL(bconfig.websitelink)
                    embedStatus.setDescription("Your Minecraft Server Panel Here :-")
                    embedStatus.addFields([
                        {
                            "name": "Ip",
                            "value": "```" + `${mcIP}` + "```",
                            "inline": true
                        },
                        {
                            "name": "Port",
                            "value": "```" + `${mcPort}` + "```",
                            "inline": true
                        },
                        {
                            "name": "Status",
                            "value": "```" + status + "```",
                            "inline": true
                        },
                        {
                            "name": "Player Count",
                            "value": "```" + onlineplayers + "/" + maxplayers + "```",
                            "inline": true
                        },
                        {
                            "name": "Version",
                            "value": "```" + data.version + "```",
                            "inline": true
                        },
                        {
                            "name": "Motd",
                            "value": "```" + motd + "```"
                        },
                        {
                            "name": "Players",
                            "value": "```" + players + "```"
                        }
                    ])
                    embedStatus.setThumbnail("attachment://icon.png")
                    embedStatus.setColor(color);
                    embedStatus.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
                    embedStatus.setTimestamp();

                    interaction.reply({

                        embeds: [embedStatus], files: [attachment]

                    });

                })

        } catch (error) {

            console.log(error)

            interaction.reply({

                embeds: [embederr]

            });
        }
    }
}
