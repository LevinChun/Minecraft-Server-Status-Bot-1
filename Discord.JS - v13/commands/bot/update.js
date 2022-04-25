const Discord = require('discord.js');
const bconfig = require('../../config.json')
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("update")
      .setDescription("Shows Bot Latest Update"),
   async execute(interaction) {

      // bot-perm
      if (!interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.EMBED_LINKS)) {

         interaction.reply({

            content: "Please Give Me **EMBED_LINKS** permission in this channel .",
            ephemeral: true,

         });
      }

      let embedUpdate = new Discord.MessageEmbed();
      embedUpdate.setTitle(interaction.client.user.username)
      embedUpdate.setURL(bconfig.websitelink)
      embedUpdate.setDescription(`
      • Updated To Discord.JS v13
      • Added Slash Commands
      • Added Some Buttons
      • Removed Commands - Prefix , Setup-Prefix , Reset-Prefix , Status-Java , Status-Bedrock
      • Merged Commands - [Status-Java , Status-Bedrock] - [Status]
      • Fixed Setup And Reset Commands Issues
      • Added New Invite Link - [Click Here](https://log-network.me/invite)

    Team LoG-Network
        `)
      embedUpdate.setColor("BLUE");
      embedUpdate.setThumbnail(interaction.client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
      embedUpdate.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
      embedUpdate.setTimestamp();

      interaction.reply({
         embeds: [embedUpdate]
      });
   }
}
