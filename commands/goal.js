const Discord = require('discord.js');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class goal extends Command {
    constructor() {
        super({
            name: 'goal',
            aliases: ['g'],
            description: 'Shows how many servers left to reach 150 servers',
            usage: '!goal',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
        mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **goal** command in the server: ${message.guild.name} (${message.guild.id})`);
        const servers = client.shard.fetchClientValues('guilds.size')
            .then(results => {

                const embed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setTimestamp()
                    .setDescription(`I need ${Math.floor(150 - results.reduce((prev, val) => prev + val, 0))} more servers to reach my 150 servers goal.`);
                message.channel.send(embed);

            })
    }
    // module.exports.help = {
    //     name: 'goal',
    //     description: 'Shows how many servers left to reach 150 servers',
    //     usage: 'goal'
    // }
}
module.exports = goal;