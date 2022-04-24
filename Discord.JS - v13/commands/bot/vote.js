const Discord = require('discord.js');
const bconfig = require('../../config.json')
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("vote")
      .setDescription("Gives My Invite Link"),
   async execute(interaction) {

      // bot-perm
      if (!interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.EMBED_LINKS)) {

         interaction.reply({

            content: "Please Give Me **EMBED_LINKS** permission in this channel .",
            ephemeral: true,

         });
      }

      const row = new Discord.MessageActionRow()
         .addComponents(
            new Discord.MessageButton()
               .setLabel("Top.gg")
               .setStyle('LINK')
               .setURL("https://top.gg/bot/802868654957789204"),
         )

      let embedVote = new Discord.MessageEmbed();
      embedVote.setTitle(interaction.client.user.username)
      embedVote.setURL(bconfig.websitelink)
      embedVote.setDescription("Voting Link Panel Here :-")
      embedVote.setColor("BLUE");

      interaction.reply({
         embeds: [embedVote],
         components: [row]
      });
   }
}
