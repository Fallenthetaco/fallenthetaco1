const config = require('../config.json');
const Discord = require('discord.js');
const figlet = require('figlet');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class asciify extends Command {
    constructor() {
        super({
            name: 'asciify',
            aliases: ['as'],
            description: 'Shows a nice name/word',
            usage: '!asciify (letters/numbers)',
            category: 'fun',
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
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **asciify** command`)
            mentionHook.send(webhook);
            var maxLen = 14 // You can modify the max characters here

            if (args.join(' ').length > maxLen) return message.channel.send('Only 14 characters admitted!')

            if (!args[0]) return message.channel.send('Please specify a test to asciify!');
            figlet(`${args.join(' ')}`, function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                message.channel.send(`${data}`, {
                    code: 'AsciiArt'
                });
            });

        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setFooter('Command: asciify')
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'asciify',
    //     description: 'Shows a nice name/word',
    //     usage: 'asciify (letters/numbers)'
    // }
}
module.exports = asciify;
