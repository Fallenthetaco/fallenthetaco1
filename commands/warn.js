const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const ms = require('ms');
const Enmap = require('enmap');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class warn extends Command {
    constructor() {
        super({
            name: 'warn',
            aliases: ['warn'],
            description: 'Warns the user',
            usage: '!warn @user <reason'
        })
    }

    async run(client, message, args) {
        mentionHook.send(`${message.author.tag} used the **warn** command in the server: ${message.guild.name}`);
        try {
            if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Sorry, you do not have **Manage Roles** permission to use this command');
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('Sorry, I am missing the **MANAGE ROLES** permission to use this command!')
            if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(embed);
            let user = message.guild.member(message.mentions.users.first() || args[0] || message.author);
            const userFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You must mention a user or ID')
            if (!user) return message.channel.send(userFail);
            let reason = args.slice(1).join(' ');
            const reasonFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You must supply a reason for the warning.')
            if (reason.length < 1) return message.channel.send(reasonFail);

            const highestRoleFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You can not warn a member that has higher or the same permissions than you!')
            if (user.highestRole.position >= message.member.highestRole.position) return message.channel.send(highestRoleFail);


            const data = client.warnings.ensure(`${message.guild.id}_${user.id}`, [{
                num: 0
            }]);
            const warns = client.warnings.ensure(`${message.guild.id}_${user.user.username}`, {
                warns: 0
            })
            if (data) {
                user.send(`You have been warned by ${message.author.tag} in the server: ${message.member.guild.name}, for the reason: ${reason}`)
                message.channel.send(`I have warned the user with the id: ${user.id}`);
                let warn = Math.floor(warns.warns + 1)
                client.warnings.set(`${message.guild.id}_${user.user.username}`, {
                    warns: warn
                })

                client.warnings.push(`${message.guild.id}_${user.id}`, [{
                    num: warn,
                    reason: reason
                }]);
                console.log(client.warnings)
            }
        } catch (e) {
            console.log(e);
        }
    }
}
// module.exports.help = {
//     name: 'warn',
//     description: 'Warns the user',
//     usage: 'warn (user) (reason)'
// }
module.exports = warn;