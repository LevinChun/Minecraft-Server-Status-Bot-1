const Discord = require('discord.js');
const bconfig = require('../../config.json')

module.exports = {
   name: 'help',
   cooldown: 5,
   execute(message, _args, client) {

      // bot-perm
      if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

      let embedHelp = new Discord.MessageEmbed();
      embedHelp.setTitle(client.user.username)
      embedHelp.setURL(bconfig.websitelink)
      embedHelp.setDescription("Helping Panel Here :-")
      embedHelp.addFields([
         {
            "name": "Commands",
            "value": `
            --------------------------
            help - Shows This Panel
            info - Gives My Info
            invite - Gives My Invite Link
            prefix - Shows Default and Custom Prefix
            update - Shows Bot Latest Update
            report - Report Your Issue To My Dev
            stats - Gives My Stats
            vote - Gives My Voting Sites Link
            setup-prefix - Sets Custom Prefix
            reset-prefix - Reset Custom Prefix
            setup - Sets Your IP and PORT
            reset - Resets Your IP and PORT
            status-java - Shows Your Java Server Status
            status-bedrock - Shows Your Bedrock Server Status
            ip - Shows Your IP and PORT
            --------------------------
            `
         }
      ])
      embedHelp.addField("Help & Updates", `• For Any Help & Updates [Join My Discord Server](${bconfig.discordinvitelink})`)
      embedHelp.setColor("BLUE");
      embedHelp.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
      embedHelp.setTimestamp();

      message.channel.send({ embeds: [embedHelp] })
   }
}