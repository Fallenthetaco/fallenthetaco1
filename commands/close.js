const Discord = require('discord.js');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');


class close extends Command {
    constructor() {
        super({
            name: 'close',
            usage: '!c',
            description: 'Close ticket',
            aliases: ['c'],
            category: 'support',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
      if (message.author.id !== '286713468285878272') {
      if (message.guild.id !== "446775078240387093") return message.channel.send('You must join the support server (by doing `!support` and clicking the middle link) in order to use this command.');
      
      let lower = `${message.author.username}-${message.author.discriminator}`
      
      const use = lower.toLowerCase();
      
      if (message.channel.name !== use) return;
      
      const confirm = args[0];
      
      if (confirm !== 'confirm') return message.channel.send('Please do \`!close confirm\` to confirm me closing your ticket.');
      const channel = message.channel;
      const user = message.author;
      
      const emedd = new Discord.RichEmbed()
      .setColor('#36393E')
      .setTimestamp()
      .setDescription(`Ticket closed by ${message.author}`)
      message.channel.send(emedd)
            
      await channel.setParent('581013641722200074');
      await channel.setName(`Closed-${use}`);
      await channel.overwritePermissions(message.author, {
        "READ_MESSAGES": false
      })
      await channel.overwritePermissions(message.author, {
        "SEND_MESSAGES": false
      })
      
      
      const embed = new Discord.RichEmbed()
        .setColor("#36393E")
        .setTimestamp()
        .setDescription('Thank you for contacting **FallenTheTaco Customer Support**. We hope that your issue was resolved today. If your issue was not resolved, please open another ticket by doing \`!new\` in the server.')
      user.send(embed);
    } else {
      if (message.channel.parent.name !== 'Support Tickets') return;
      if (message.channel.name.includes('closed-')) return;
      const user = message.guild.member(args[0])
      if (!isNaN(user)) return message.channel.send('It has to be an id');
      const use = user.user
      const channelName = message.channel.name;
      await message.channel.setParent('581013641722200074');
      await message.channel.setName(`Closed-${channelName}`);
      await message.channel.overwritePermissions(use, {
        "READ_MESSAGES": false,
        "SEND_MESSAGES": false
      });
      const emedd = new Discord.RichEmbed()
      .setColor('#36393E')
      .setTimestamp()
      .setDescription(`Ticket closed by ${message.author}`)
      message.channel.send(emedd)
    
    }
  }
}
module.exports = close;