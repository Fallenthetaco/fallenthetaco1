const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');
const randomPuppy = require('random-puppy');

class tacos extends Command {
    constructor() {
        super({
            name: 'tacos',
            aliases: ['taco'],
            description: 'Its just taco pictures',
            usage: '!tacos'
        })
    }

    async run(client, message, args) {
        mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **tacos** command in the server: ${message.guild.name} (${message.guild.id})`);
        randomPuppy('tacos')
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setImage(url);
                message.channel.send(embed);
            });

    }
    // module.exports.help = {
    //     name: 'tacos',
    //     description: 'Its just tacos',
    //     usage: 'tacos'
    // }
}
module.exports = tacos;