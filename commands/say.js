const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class say extends Command {
    constructor() {
        super({
            name: 'say',
            aliases: ['s'],
            description: "Say anything and I'll reply back",
            usage: '!say <anything>'
        })
    }

    async run(client, message, args) {
      if (!message.deletable) return;
        message.delete();
        mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **say** command in the server: ${message.guild.name} (${message.guild.id})`);
        const msg = args.join(' ');

        if (!msg) return message.channel.send('Please provide something for me to say')
        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription(msg);
        message.channel.send(embed);
    }
    // module.exports.help = {
    //     name: 'say',
    //     description: "Say anything and I'll reply back",
    //     usage: 'say (anything)'
    // }
}
module.exports = say;
