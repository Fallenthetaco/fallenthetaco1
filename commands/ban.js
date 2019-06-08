const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class ban extends Command {
    constructor() {
        super({
            name: 'ban',
            aliases: ['ban'],
            description: 'Bans a user of your choice',
            usage: '!ban @user',
            category: 'moderation',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
        try {
          const webhook = new Discord.RichEmbed()
          .setColor('#36393E')
          .setTimestamp()
          .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **ban** command`)
            mentionHook.send(webhook);
            const missing = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('I am missing the permission "Embed Links"!!')
            if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send(missing);
            const user = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('Sorry, you can not ban someone without **BAN MEMBERS** permission!');

            if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(user);

            const embedd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('Sorry, I am missing the **BAN MEMBERS** permission to use this command!')
            if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.channel.send(embedd);
            // Get mentioned user, return if none
            const target = message.mentions.members.first() || message.guild.members.get(args[0]);

            const usser = new Discord.RichEmbed()
                .setColor("#36393E")
                .setDescription('You must choose someone in the server');

            if (!target) return message.channel.send(usser);
            // Check if target has higher roles
            const tarrget = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('Sorry, you can not ban someone that has the same or higher permissions than you, Also you must have their role below yours in order for this to work');

            if (target.highestRole.position >= message.member.highestRole.position) return message.channel.send(tarrget);
            const notBannable = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('You can not ban this user.');
            if (target.bannable === false) return message.channel.send(notBannable);
            target.ban();

            const ban = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription(`${target.user.username} has been banned, goodbye :wave:`);

            message.channel.send(ban);
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`Command: ban ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }

    // module.exports.help = {
    //     name: "ban",
    //     description: 'Bans a user of your choice',
    //     usage: 'ban (user)'
    // }
}
module.exports = ban;
