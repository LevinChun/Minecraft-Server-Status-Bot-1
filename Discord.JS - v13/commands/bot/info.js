const Discord = require('discord.js');
const bconfig = require('../../config.json')

module.exports = {
  name: 'info',
  cooldown: 5,
  execute(message, _args, client) {

    // bot-perm
    if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

    let embedInfo = new Discord.MessageEmbed();
    embedInfo.setTitle(client.user.username)
    embedInfo.setURL(bconfig.websitelink)
    embedInfo.setDescription("Info Panel Here :-")
    embedInfo.addFields([
      {
        "name": "Language",
        "value": "**[JavaScript](https://www.javascript.com)**",
        "inline": true
      },
      {
        "name": "Platform",
        "value": "**[NodeJS](https://nodejs.org/en)**",
        "inline": true
      },
      {
        "name": "Library",
        "value": "**[Discord.js](https://discordjs.guide)**",
        "inline": true
      },
      {
        "name": "Packages",
        "value": "**[NPM](https://www.npmjs.com)**",
        "inline": true
      },
      {
        "name": "Api",
        "value": "**[Mcsrvstat](https://api.mcsrvstat.us)**",
        "inline": true
      },
      {
        "name": "Database",
        "value": "**[Quick.db](https://quickdb.js.org)**",
        "inline": true
      },
      {
        "name": "Website",
        "value": `**[Here](${bconfig.websitelink})**`,
        "inline": true
      },
      {
        "name": "Documentation Website",
        "value": `**[Here](${bconfig.docswebsitelink})**`,
        "inline": true
      },
      {
        "name": "FAQ's",
        "value": `**[Here](${bconfig.faqswebsitelink})**`,
        "inline": true
      },
      {
        "name": "Github",
        "value": "**[Here](https://github.com/LOG-LEGENDX/Minecraft-Server-Status-Bot)**",
        "inline": true
      },
      {
        "name": "Privacy",
        "value": "**[Here](https://github.com/LOG-LEGENDX/Minecraft-Server-Status-Bot/blob/master/PRIVACY.md)**",
        "inline": true
      },
      {
        "name": "Terms Of Services",
        "value": "**[Here](https://github.com/LOG-LEGENDX/Minecraft-Server-Status-Bot/blob/master/TOS.md)**",
        "inline": true
      }
    ])
    embedInfo.setColor("BLUE");
    embedInfo.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
    embedInfo.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
    embedInfo.setTimestamp();
    message.channel.send({ embeds: [embedInfo] });
  }

}