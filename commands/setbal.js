const modRole = 'Administrator';
const config = require('../config.json');
const fs = require('fs');
const eco = require('discord-economy');
const ownerID = process.env.ownerID
const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class setBal extends Command {
    constructor() {
        super({
            name: 'setbal',
            aliases: ['sb'],
            description: 'Sets the balance of your money',
            usage: '!setbal <amount> @user',
            owner: true,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if (!prefixes[message.guild.name]) {
            prefixes[message.guild.name] = {
                prefixes: config.prefix
            }
        };
        // client.channels.get(config.channelId).send(`${message.author.username}#${message.author.discriminator} used the **setbal** command in the server: ${message.guild.name} (${message.guild.id})`);
        let prefix = prefixes[message.guild.name].prefixes;
        const msg = message.content.toUpperCase();

        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('You are not the owner of the bot to use this command.');
        if (message.author.id !== '286713468285878272') return message.channel.send(embed);
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription(`**You need to define an amount. Usage: ${prefix}SETBAL <amount> <user>**`);
            message.channel.send(embed);
            return;
        }

        if (isNaN(args[0])) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription(`**The amount has to be a number. Usage: ${prefix}SETBAL <amount> <user>**`);
            message.channel.send(embed);
            return;
        }

        let defineduser = '';
        if (!args[1]) {
            defineduser = message.author.id;
        } else {
            let firstMentioned = client.users.get(args[1]);
            defineduser = firstMentioned.id;
        }

        eco.AddToBalance(defineduser, parseInt(args[0])).then((i) => {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription(`**Added ${args[0]} to ${defineduser} account.**`);
            message.channel.send(embed);
        });

    }

    // module.exports.help = {
    //     name: 'setbal',
    //     description: 'Sets the balance of your money',
    //     usage: 'setbal <amount> <user>'
    // }
}
module.exports = setBal;