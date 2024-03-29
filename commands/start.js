const eco = require('discord-economy');
const fs = require("fs");
const config = require('../config.json');
const Enmap = require('enmap');
const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class start extends Command {
    constructor() {
        super({
            name: 'start',
            aliases: ['start'],
            category: 'economy',
            description: 'Gets 1000 tacos for free',
            usage: '!start'
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **start** command`)
        mentionHook.send(webhook);
      client.blocks.ensure('blacklist', []);
      let people = client.blocks.get('blacklist');
      if (people.includes(message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');
      client.players.ensure('0', []);
        const data = client.players.get("0");
        try {
            if (data.includes(message.author.id)) {
                const embed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription('You have already claimed your free 1500 🌮. You can claim again after I hit 200 servers');
                message.channel.send(embed);
            } else {
                const embed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription('You have successfully claimed 1500 tacos')
                eco.AddToBalance(message.author.id, 1500);
                message.channel.send(embed);
                client.players.push("0", message.author.id)
            }
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`Command: start ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'start',
    //     description: 'Gets 1000 tacos for free',
    //     usage: 'start'
    // }
}
module.exports = start;
