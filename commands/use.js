const {
    Command
} = require('djs-easy-command');
const Discord = require('discord.js');
const eco = require('discord-economy');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class use extends Command {
    constructor() {
        super({
            name: 'use',
            usage: '!use <item>',
            description: 'Use your powerups',
            aliases: ['u'],
            category: 'economy',
            owner: false
        })
    }
    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.tag} used the **use** command`)
        mentionHook.send(webhook);
      client.blocks.ensure('blacklist', []);
        const people = client.blocks.get('blacklist');
        const blacklisted = new Discord.RichEmbed()
        .setColor('#36393E')
        .setDescription(`<@${message.author.id}>, You have been blacklisted from using economy commands.`)
        if (people.includes(message.author.id)) return message.channel.send(blacklisted);
        let powerup = client.powerups.ensure(message.author.id, {
            srirachas: 0,
            jalapenos: 0,
            salsas: 0
        });
        let powerups = client.powerups.get(message.author.id);
        let activate = args[0];
        var usaTime = new Date().toLocaleString("en-US", {
            timeZone: "America/Los_Angeles"
        });
        var hours = new Date(usaTime).getHours();
        if (activate === 'srirachas') {
            let totals = powerups.srirachas - 1;
            const embed = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You don\'t have this much items.');
            if (totals < 0) return message.channel.send(embed);
            const notEnough = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You do not have this item so you can\'t use it.')
            if (powerups.srirachas === 0) return message.channel.send(notEnough);
            var times2 = Math.floor(hours + 1);

            client.powerups.dec(message.author.id, 'srirachas');
            client.activatePower.set(`${message.author.id}_srirachas`, times2);
            const done = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You have successfully used this powerup. It will make everything u get x3, and also will last for 1 hour, please use it wisely.')
            message.channel.send(done);

        }  else if (activate === 'jalapenos') {
            let totals = powerups.jalapenos - 1;
            const embed = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You don\'t have this much items.');
            if (totals < 0) return message.channel.send(embed);
            const notEnough = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You do not have this item so you can\'t use it.')
            if (powerups.jalapenos === 0) return message.channel.send(notEnough);
            var times2 = Math.floor(hours + 1);
            client.activatePower.set(`${message.author.id}_jalapenos`, times2);
            client.powerups.dec(message.author.id, 'jalapenos');
            const done = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You have successfully used this powerup. It will make the amount of tacos u get x4, and also will last for 1 hour, please use it wisely.')
            message.channel.send(done);

        } else if (activate === 'salsas') {
            let totals = powerups.salsas - 1;
            const embed = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You don\'t have this much items.');
            if (totals < 0) return message.channel.send(embed);
            const notEnough = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You do not have this item so you can\'t use it.')
            if (powerups.salsas === 0) return message.channel.send(notEnough);
            var times2 = Math.floor(hours + 1);
            client.activatePower.set(`${message.author.id}_salsas`, times2);
            client.powerups.dec(message.author.id, 'salsas');
            const done = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You have successfully used this powerup. It will make everything u get x2, and also will last for 1 hours, please use it wisely.')
            message.channel.send(done);
        } else {
          const fail = new Discord.RichEmbed()
          .setColor('#36393E')
          .setFooter('Usage: !use <item>')
          .setDescription(`<@${message.author.id}>, Please choose between **salsas**, **jalapenos**, **srirachas**.`)
            message.channel.send(fail);
        }
    }
}
module.exports = use;
