const config = require('../config.json');
const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class prune extends Command {
    constructor() {
        super({
            name: 'prune',
            aliases: ['purge'],
            category: 'moderation',
            description: 'Prunes messages from yourself only.',
            usage: '!prune <amount>'
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **prune** command`)
        mentionHook.send(webhook); // This sends how many messages they deleted to chat, we also want to delete this message. This deletes the message after 10000 milliseconds.
        const fail = new Discord.RichEmbed()
        .setColor('#36393E')
        .setDescription('You do not have the permission **Manage Messages** to use this command')
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(fail);


        // This checks if args[0] is NOT a number, if not it runs the return statement which sends a message in chat.
        // We also need to check if the number is LESS THAN 100, since 100 is the max you can delete at once.
        if (isNaN(args[0])) return message.channel.send('Please supply a number.')
        const clear = parseInt(args[0]) + 1;
        const greaterthan100 = new Discord.RichEmbed()
        .setColor('#36393E')
        .setDescription('**Please supply a number less than 100**')
        if (clear > 100) return message.channel.send(greaterthan100);
        const lessthan1 = new Discord.RichEmbed()
        .setDescription('**Please supply a number more than 1**')
        .setColor('#36393E')
        if (clear < 1) return message.channel.send(lessthan1);
        // This checks if args[0] is MORE THAN 100, if it is, it returns and sends a message.

        // Now, we can delete the messages
        message.channel.bulkDelete(clear)
            .then(messages => {
                const embed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription(`**Successfully deleted \`${messages.size}/${args[0]}\` messages**`);

                message.channel.send(embed).then(msg => msg.delete({
                    timeout: 10000
                }))
            });
    };
    // module.exports.help = {
    //     name: 'prune',
    //     description: 'Prunes messages from yourself only.',
    //     usage: 'prune [number of messages]'
    // };
}
module.exports = prune;
