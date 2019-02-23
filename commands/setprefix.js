const Discord = require("discord.js");
const fs = require("fs");
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class setprefix extends Command {
    constructor() {
        super({
            name: 'setprefix',
            aliases: ['sp'],
            description: 'Sets the bots prefix to be anything',
            usage: '!setprefix <anything>'
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **setprefix** command`)
        // if (message.author.id !== process.env.ownerID) return message.channel.send('Please check https://fallenthetaco.glitch.me/ for more info');
        mentionHook.send(webhook);

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry, only the Administrator people of the server can use this command");
        const embeddddddd = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('Sorry, I am missing the **ADMINISTRATOR** permission to use this command!')
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embeddddddd);


        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription("Please tell me **any** prefix you want me to change!!");
        if (!args[0]) return message.channel.send(embed)

        client.db.find({
            id: message.guild.id
        }, async (err, data) => {
            if (!data[0]) {
                await client.db.insert({
                    id: message.guild.id,
                    prefix: args.join(' ')
                }, (err, data) => {
                    if (err) console.error(err)
                })
            } else {
                await client.db.update({
                    id: message.guild.id
                }, {
                    $set: {
                        prefix: args.join(' ')
                    }
                }, (err, data) => {
                    if (err) console.error(err)
                })
            }
            client.guildPrefixes.set(message.guild.id, args.join(' '))
            const prefixUpdate = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription(`I changed the prefix to ${args.join(' ')}`)
            message.channel.send(prefixUpdate);
        });
    }
}

// module.exports.help = {
//     name: 'setprefix',
//     description: 'Sets the bots prefix to be anything',
//     usage: 'setprefix (anything)'
// }

module.exports = setprefix;
