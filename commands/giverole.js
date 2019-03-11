const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class giverole extends Command {
    constructor() {
        super({
            name: 'giverole',
            aliases: ['gr'],
            category: 'moderation',
            description: 'Gives a role to a user',
            usage: '!giverole @user (role)',
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
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **giverole** command`)
            mentionHook.send(webhook);
            const user = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setTimestamp()
                .setDescription('Sorry, you do not have **Manage Roles** permission to use this command');

            if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(user);

            const embeddd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setTimestamp()
                .setDescription('Sorry, I am missing the **MANAGE ROLES** permission to use this command!')
            if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(embeddd);

            const target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

            const usser = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setTimestamp()
                .setFooter('Usage: !giverole @user (role name)')
                .setDescription('Could not find that user!');

            if (!target) return message.channel.send(usser);

            const role = args.slice(1).join(' ');

            const rolle = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setTimestamp()
                .setFooter('Usage: !giverole @user (role name)')
                .setDescription('Specify a role!');

            if (!role) return message.channel.send(rolle);

            const dRole = message.guild.roles.find('name', role);

            const drolle = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setTimestamp()
                .setFooter('Usage: !giverole @user (role name)')
                .setDescription('Could not find that role!');

            if (!dRole) return message.channel.send(drolle);
            const tarrget = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setTimestamp()
                .setDescription('Sorry, you can not give someone a role that has the same or higher positions than you, Also you must have their role below yours in order for this to work');

            if (target.highestRole.position >= message.member.highestRole.position) return message.channel.send(tarrget);

            if (target.roles.has(dRole.id)) return;
            const add = target.addRole(dRole.id);
            if (!add) return message.channel.send('');
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setTimestamp()
                .setDescription(`You now been given a role called **${dRole.name}**`);

            const embedd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setTimestamp()
                .setDescription(`We tried to DM them, but their DMs are locked so <@${target.id}> has now been given a role called **${dRole.name}**`);
            target.send(embed).catch(message.channel.send(embedd));
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setTimestamp()
                .setFooter(`Command: giverole ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }

    // module.exports.help = {
    //     name: "giverole",
    //     description: 'Gives a role to a user',
    //     usage: 'giverole (user) (role)'
    // }
}
module.exports = giverole;
