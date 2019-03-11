const fetch = require('node-fetch');
const Discord = require('discord.js');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');

class ping extends Command {
    constructor() {
        super({
            name: 'ping',
            aliases: ['ping'],
            description: 'ping/pong basically.',
            usage: '!ping',
            category: 'util',
            owner: false,
            nsfw: false,
            disabled: true
        })
    }
    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **ping** command`)
        mentionHook.send(webhook);
        new Promise((resolve, reject) => {
            const start = Date.now()
            fetch('https://discordapp.com/api/v6/channels/${msg.channel.id}/typing', {
                method: "post",
                headers: {
                    "Authorization": `Bot ${client.token}`
                }
            }).then(() => {
                const time = Date.now() - start
                resolve(time)
                message.channel.send(`:ping_pong: Pong! Ping: \`${time}ms\` API: \`${Math.round(client.ping)}\``)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

// module.exports.help = {
//     name: "ping",
//     description: 'ping/pong basically.',
//     usage: 'ping'
// }

module.exports = ping;
