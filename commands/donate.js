const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class donate extends Command {
    constructor() {
        super({
            name: 'donate',
            aliases: ['donate'],
            description: 'Donate some money to FallenTheTaco',
            usage: '!donate',
            category: 'util',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **donate** command`)
        mentionHook.send(webhook);
        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .addField('Patreon Donation', '[Click Here](https://www.patreon.com/Fallentaco)')
            .setFooter(`Requested by: ${message.author.tag} (${message.author.id})`)
        message.channel.send(embed);
    }
    // module.exports.help = {
    //     name: 'donate',
    //     description: 'Donate some money to FallenTheTaco',
    //     usage: 'donate'
    // }
}
module.exports = donate;
