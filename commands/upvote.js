const config = require('../config.json');
const Discord = require('discord.js');
const { Command } = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class upvote extends Command {
  constructor() {
    super({
  name: 'upvote',
  aliases: ['uv'],
  description: 'Upvote for me',
  usage: '!upvote'
  })
}

async run (client, message, args) {
  const webhook = new Discord.RichEmbed()
  .setColor('#36393E')
  .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
  .setDescription(`${message.author.username}#${message.author.discriminator} used the **upvote** command`)
    mentionHook.send(webhook);
   const embedd = new Discord.RichEmbed()
       .setTitle(`Vote for me`)
       .setColor(`#36393E`)
       .addField('Discord Bots List:', `[Click Here](https://discordbots.org/bot/436047056394649600/vote)`);
       message.channel.send(embedd);
    // message.channel.send('Sorry, but the upvote system is broken. Please wait until it is fixed thanks.');
}
}
module.exports = upvote;
// module.exports.help = {
//     name: 'upvote',
//     description: 'Vote for me',
//     usage: 'upvote'
// }
