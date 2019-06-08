const Discord = require('discord.js');
const ms = require('ms');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class remind extends Command {
    constructor() {
        super({
            name: 'remindme',
            aliases: ['r'],
            category: 'fun',
            description: 'Reminds you in a certain amount of time',
            usage: '!remindme <time> <reason>',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
      let remindTime = args[0];
      if (!isNaN(remindTime)) {
        let embeddd = new Discord.RichEmbed()
        .setColor('#36393E')
        .setTitle('Proper Usage')
        .setDescription('!remindme 15min anything you want to say after that')
        return message.channel.send(embeddd);
      }
      let user = message.author;
      if (!remindTime) {
        let embed = new Discord.RichEmbed()
        .setColor('#36393E')
        .setTitle('Proper Usage')
        .setDescription('!remindme 15min anything you want to say after that')
        return message.channel.send(embed);
      }
      let reminder = args.slice(1).join(' ');
      if (!reminder) {
        let embedd = new Discord.RichEmbed()
         .setColor('#36393E')
        .setTitle('Proper Usage')
        .setDescription('!remindme 15min anything you want to say after that')
      }
      let remindEmbed = new Discord.RichEmbed()
        .setColor('#36393E')
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .addField('Reminder', `\`\`\`${reminder}\`\`\``)
        .addField('Time', `\`\`\`${remindTime}\`\`\``)
        .setTimestamp();
      message.channel.send(remindEmbed);
      
      setTimeout(function() {
        let reminderEmbed = new Discord.RichEmbed()
          .setColor('#36393E')
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .addField('Reminder', `\`\`\`${reminder}\`\`\``)
          .setTimestamp();
        
        user.send(reminderEmbed);
      }, ms(remindTime));
    }
}

module.exports = remind;