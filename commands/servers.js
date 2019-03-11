const config = require('../config.json');
const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class servers extends Command {
    constructor() {
        super({
            name: 'servers',
            aliases: ['server'],
            category: 'util',
            description: 'Shows how many servers I am in',
            usage: '!servers'
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **servers** command`)
        mentionHook.send(webhook);
        const servers = client.shard.fetchClientValues('guilds.size')
            .then(results => {

                const embed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription(`I am in ${results.reduce((prev, val) => prev + val, 0)} servers.`);
                message.channel.send(embed);

                // client.channels.get(config.channelId).send(`${message.author.username}#${message.author.discriminator} used the **servers** command in the server: ${message.guild.name} (${message.guild.id})`);
            })
    }
    // module.exports.help = {
    //     name: 'servers',
    //     description: 'Shows how many servers I am in',
    //     usage: 'servers'
    // }
}
module.exports = servers;
