const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class kick extends Command {
    constructor() {
        super({
            name: 'kick',
            aliases: ['k'],
            description: 'Kicks the user',
            usage: '!kick @user',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
        try {
            mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **kick** command in the server: ${message.guild.name} (${message.guild.id})`);
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You do not have the permission **Kick Members** to use this command');
            if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(embed);
            const embeddddddd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('Sorry, I am missing the **KICK MEMBERS** permission to use this command!')
            if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(embeddddddd);
            let mem = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
            const embedd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You must mention a user!');
            if (!mem) return message.channel.send(embedd);
            const embeddd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You can not kick someone that has the same or higher permissions than you!');
            if (mem.highestRole.position >= message.member.highestRole.position) return message.channel.send(embeddd);
            const notBannable = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You can not kick this user.');
            if (mem.kickable === false) return message.channel.send(notBannable);
            mem.kick();
            const embedddd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription(`${mem.user.username} has been kicked. Goodbye :wave:`)
            message.channel.send(embedddd);

        } catch (e) {

            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`Command: kick ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'kick',
    //     description: 'Kicks the user',
    //     usage: 'kick @user'
    // }
}
module.exports = kick;
