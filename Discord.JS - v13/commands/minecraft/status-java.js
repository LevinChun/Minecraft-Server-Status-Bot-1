const Discord = require('discord.js');
const predb = require('quick.db')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const bconfig = require("../../config.json");

module.exports = {
    name: 'status-java',
    cooldown: 30,
    async execute(message, _args, client) {

        let mcIP = predb.get(`guild_${message.guild.id}_ip`) || "Not Setup"
        let mcPort = predb.get(`guild_${message.guild.id}_port`) || "Not Setup"

        // bot-perm
        if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embedstatuserr = new Discord.MessageEmbed()
        embedstatuserr.setDescription(`
        • Maybe, IP and PORT Has Been Not Setuped For This Server .
        • If you thought that bot is giving wrong reply then use **${bconfig.defaultprefix}reset** for reset and then **${bconfig.defaultprefix}setup** command for setup your server ip and port again`)
        embedstatuserr.setColor('RED')
        embedstatuserr.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embedstatuserr.setTimestamp()

        if (!message.guild.id === predb.has(`guild_${message.guild.id}_ip`)) return message.channel.send({ embeds: [embedstatuserr] })
        if (!message.guild.id === predb.has(`guild_${message.guild.id}_port`)) return message.channel.send({ embeds: [embedstatuserr] })

        let embederr = new Discord.MessageEmbed()
        embederr.setDescription(`
        • Your Server Is Not Reachable , Here Are Possible Reasons -

        • Your IP/PORT Is Wrong .

        • Your Minecraft Server Is Offline .

        • Your Minecraft Server Query Is False .
        `)
        embederr.setColor('RED')
        embederr.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embederr.setTimestamp()

        let serverURL = `https://api.mcsrvstat.us/2/${mcIP}:${mcPort}`;

        try {

            await fetch(serverURL)
                .then(res => res.json())
                .then(data => {

                    let status = "Offline"
                    let color = bconfig.botoldcolor
                    let attachment = new Discord.MessageAttachment(client.user.displayAvatarURL({ format: "png", size: 64, dynamic: true }), "icon.png")
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
                    embedStatus.setTitle(client.user.username)
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
                    embedStatus.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
                    embedStatus.setTimestamp();
                    message.channel.send({ embeds: [embedStatus], files: [attachment] });

                })

        } catch (error) {

            console.log(error)

            return message.channel.send({ embeds: [embederr] });
        }

    }
}