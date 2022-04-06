const Discord = require('discord.js');
const bconfig = require('../../config.json')

module.exports = {
    name: 'update',
    cooldown: 5,
    execute(message, _args, client) {

        // bot-perm
        if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embedUpdate = new Discord.MessageEmbed();
        embedUpdate.setTitle(client.user.username)
        embedUpdate.setURL(bconfig.websitelink)
        embedUpdate.setDescription(`
        • Updated To Discord.JS v13
        `)
        embedUpdate.setColor("BLUE");
        embedUpdate.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedUpdate.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        embedUpdate.setTimestamp();
        message.channel.send({ embeds: [embedUpdate] });

    }
}