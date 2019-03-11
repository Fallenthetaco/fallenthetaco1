const config = require('../config.json');
const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class listemoji extends Command {
    constructor() {
        super({
            name: 'listemoji',
            aliases: ['le'],
            category: 'util',
            description: 'Lists all the custom emojis from this server',
            usage: '!listemoji',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
        try {
          const webhook = new Discord.RichEmbed()
          .setColor('#36393E')
          .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **listemoji** command`)
            mentionHook.send(webhook);
            const emojiList = message.guild.emojis.map(e => e.toString()).join(" ");
            const rip = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You dont have any custom emojis in this server.')
            if (!emojiList) return message.channel.send(rip);
            const emojis = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription(`Here are all of the custom emojis of this server: ${emojiList}`)
            message.channel.send(emojis);
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`Command: leaderboard ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'listemoji',
    //     description: 'Lists all the custom emojis from this server',
    //     usage: 'listemoji'
    // }
}
module.exports = listemoji;
