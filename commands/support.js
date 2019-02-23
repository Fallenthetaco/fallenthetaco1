const Discord = require('discord.js');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class support extends Command {
    constructor() {
        super({
            name: 'support',
            aliases: ['support'],
            description: 'Shows the support server if you need something or invite me to your server',
            usage: '!support'
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **support** command`)
        mentionHook.send(webhook);
        const embed = new Discord.RichEmbed()
            .setTitle(`Links`)
            .setColor(`#36393E`)
            .addField('Add Me', `[Click Here](https://discordapp.com/api/oauth2/authorize?client_id=436047056394649600&permissions=268695734&scope=bot)`)
            .addField('Support Server:', `[Click Here](https://discord.gg/53D2WKY)`)
            .addField('Website', `[Click Here](https://fallenthetaco.glitch.me)`);
        message.channel.send(embed);
        message.channel.send("Or you can DM me <@436047056394649600> for support and the owner will contact you when he comes online.")
    }
    // module.exports.help = {
    //     name: 'support',
    //     description: 'Shows the support server if you need something or invite me to your server',
    //     usage: 'support'
    // }
}
module.exports = support;
