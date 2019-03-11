const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class removerole extends Command {
    constructor() {
        super({
            name: 'removerole',
            aliases: ['rm'],
            category: 'moderation',
            description: 'Removes a role from a user',
            usage: '!removerole @user <role>'
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **removerole** command`)
        mentionHook.send(webhook);
        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('Sorry, you do not have **Manage Roles** permission to use this command');
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(embed);
        const embeddddddd = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('Sorry, I am missing the **MANAGE ROLES** permission to use this command!')
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(embeddddddd);
        const target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        const embedd = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('Could not find that user!')
        if (!target) return message.channel.send(embedd);
        const role = args.slice(1).join(' ');
        const embeddd = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('Specify a role!')
        if (!role) return message.channel.send(embeddd);
        const dRole = message.guild.roles.find('name', role);
        const embedddd = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('Could not find that role!');

        if (!dRole) return message.channel.send(embedddd);

        if (target.roles.has(dRole.id));
        target.removeRole(dRole.id);
        const embeddddd = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription(`A role called **${dRole.name}** has been removed from you`);
        const embedddddd = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription(`We tried to DM them, but their DMs are locked so a role called **${dRole.name}** has been removed from <@${target.id}>`);

        target.send(embeddddd).catch(message.channel.send(embedddddd));
    }

    // module.exports.help = {
    //     name: 'removerole',
    //     description: 'Removes a role from a user',
    //     usage: 'removerole (user) (role)'
    // };
}
module.exports = removerole;
