const Discord = require('discord.js');
const predb = require('quick.db')
const bconfig = require('../../config.json')

module.exports = {
    name: 'reset',
    cooldown: 10,
    async execute(message, _args, client) {

        // user-perm
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('Make Sure You Have **MANAGE_SERVER** permission to use this command .')

        // bot-perm
        if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embednoip = new Discord.MessageEmbed()
        embednoip.setDescription(`• No IP has been setuped , For Setup Use **${bconfig.defaultprefix}setup**`)
        embednoip.setColor('YELLOW')
        embednoip.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embednoip.setTimestamp()

        if (!message.guild.id === predb.has(`guild_${message.guild.id}_ip`)) return message.channel.send({ embeds: [embednoip] })

        let embednoport = new Discord.MessageEmbed()
        embednoport.setDescription(`• No PORT has been setuped , For Setup Use **${bconfig.defaultprefix}setup**`)
        embednoport.setColor('YELLOW')
        embednoport.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embednoport.setTimestamp()

        if (!message.guild.id === predb.has(`guild_${message.guild.id}_port`)) return message.channel.send({ embeds: [embednoport] })

        await predb.delete(`guild_${message.guild.id}_ip`)
        await predb.delete(`guild_${message.guild.id}_port`)

        let embedReset = new Discord.MessageEmbed();
        embedReset.setTitle(client.user.username)
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
        embedReset.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedReset.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        embedReset.setTimestamp();
        message.channel.send({ embeds: [embedReset] });
    }
}