const Discord = require('discord.js');
const bconfig = require('../../config.json')

module.exports = {
    name: 'vote',
    cooldown: 5,
    execute(message, _args, client) {

        // bot-perm
        if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embedVote = new Discord.MessageEmbed();
        embedVote.setTitle(client.user.username)
        embedVote.setURL(bconfig.websitelink)
        embedVote.setDescription("Voting Link Panel Here :-")
        embedVote.addField("Top.gg", "[Here](https://top.gg/bot/802868654957789204)")
        embedVote.setColor("BLUE");
        embedVote.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedVote.setFooter({ text:`${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        embedVote.setTimestamp();
        message.channel.send({ embeds: [embedVote] });

    }
}