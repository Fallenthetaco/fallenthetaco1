const fs = require('fs');
const config = require('../config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const { Command } = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class unmute extends Command {
  constructor() {
    super({
  name: 'unmute',
  aliases: ['um'],
  description: 'Unmutes a user',
  usage: '!unmute @user'
  })
}

async run (client, message, args) {
  const webhook = new Discord.RichEmbed()
  .setColor('#36393E')
  .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
  .setDescription(`${message.author.username}#${message.author.discriminator} used the **unmute** command`)
    mentionHook.send(webhook);
    try {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('You do not have the permission **Manage Members** to use this command');
        const embeddddddd = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('Sorry, I am missing the **MANAGE ROLES** permission to use this command!')
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(embeddddddd);
        let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
        const userFail = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('You did not specify a user or ID!!')
        if (!toMute) return message.channel.send(userFail);
        const permFail = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('You can not unmute a member that has higher permissions than you!')
        if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send(permFail);
        let role = message.guild.roles.find(r => r.name === 'Muted');
        const embeds = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('This user is not muted!')
        if (!role || !toMute.roles.has(role.id)) return message.channel.send(embeds);
        await toMute.removeRole(role);

        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription(`I have unmuted ${toMute.user.tag}!`)
        message.channel.send(embed);
    } catch (e) {
        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setFooter(`Command: unmute ${message.guild.name}`)
            .setDescription(e);
        errorBot.send(embed);
    }
}
// module.exports.help = {
//     name: 'unmute',
//     description: 'Unmutes a user',
//     usage: 'unmute (user)'
// }
}
module.exports = unmute;
