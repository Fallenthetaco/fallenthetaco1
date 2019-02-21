const Discord = require('discord.js');
const Enmap = require('enmap');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class warnings extends Command {
    constructor() {
        super({
            name: 'warnings',
            aliases: ['warns'],
            description: 'Gather the users warns',
            usage: '!warnings @user'
        })
    }

    async run(client, message, args) {
        mentionHook.send(`${message.author.tag} used the **warnings** command in the server: ${message.guild.name} (${message.guild.id})`);
        try {
            let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.member(message.author);
            const data = client.warnings.get(`${message.guild.id}_${user.id}`);
            const warn = client.warnings.get(`${message.guild.id}_${user.user.username}`);

            if (!warn) {
                let warnEmbed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setAuthor(`${user.user.tag} (${user.user.id})`)
                    .addField('Number of Warnings:', 0)
                    .setFooter(`Requested by: ${message.author.tag} (${message.author.id})`);

                message.channel.send(warnEmbed);
            } else {
                var i;
                let warnEmbeded = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setAuthor(`${user.user.tag} (${user.user.id})`)
                    .addField('Number of Warnings:', warn.warns)
                    .setFooter(`Requested by: ${message.author.tag} (${message.author.id})`)

                for (i = 1; i < data.length; i++) {
                    warnEmbeded.addField(`Reason: ${data[i][0].num}`, data[i][0].reason, true)
                }
                await message.channel.send(warnEmbeded);
            }
        } catch (e) {
            console.log(e);
        }
    }
}
// module.exports.help = {
//     name: 'warnings',
//     description: 'Gather the users warns',
//     usage: 'warnings (user)'
// }
module.exports = warnings;
