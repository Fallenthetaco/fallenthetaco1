const config = require('../config.json');
const fs = require('fs');
const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class prefix extends Command {
    constructor() {
        super({
            name: 'prefix',
            aliases: ['pf'],
            description: 'Shows my current prefix',
            usage: '!prefix',
            category: 'util',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **prefix** command`)
        // if (message.author.id !== process.env.ownerID) return message.channel.send('Please check https://fallenthetaco.glitch.me/ for more info');
        mentionHook.send(webhook);
        let prefix = client.guildPrefixes;
        client.db.find({
            id: message.guild.id
        }, (err, data) => {
            if (err) console.error(err)
            const noPrefix = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription(`There isn't a prefix set. Set one using \`${client.prefixes[0]}setprefix <prefix>\``);
            if (!data[0]) return message.channel.send(noPrefix)
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription(`My prefix is **${data[0].prefix}**`)
            message.channel.send(embed);
        });

      }
    // module.exports.help = {
    //     name: 'prefix',
    //     description: 'Shows my current prefix',
    //     usage: 'prefix'
    // }
}
module.exports = prefix;
