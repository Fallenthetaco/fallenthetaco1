const Discord = require('discord.js');

const Enmap = require('enmap');
const {
  Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class clearwarn extends Command {
      constructor(){
        super({
          name: 'clearwarn',
          aliases: ['cw'],
          category: 'moderation',
          description: 'Clears all warns from a user',
          usage: 'clearwarn @user'
        })
      }
      async run (client, message, args) {
        const webhook = new Discord.RichEmbed()
        .setColor('#36393E')
        .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
        .setDescription(`${message.author.username}#${message.author.discriminator} used the **clearwarns** command`)
          mentionHook.send(webhook);
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.member(message.author);
        const data = client.warnings.get(`${message.guild.id}_${user.id}`);
        const embed = new Discord.RichEmbed()
        .setColor('#36393E')
        .setDescription('The user doesn\'t have any warns for me to clear')
        if (!data) return message.channel.send(embed);
        const warn = client.warnings.get(`${message.guild.id}_${user.user.username}`);

        client.warnings.delete(`${message.guild.id}_${user.id}`);
        client.warnings.delete(`${message.guild.id}_${user.user.username}`);
        const cleared = new Discord.RichEmbed()
        .setColor('#3693E')
        .setDescription(`I have successfully cleared ${user.user.tag}'s warns`)
        message.channel.send(cleared);

      }
}
module.exports = clearwarn;
