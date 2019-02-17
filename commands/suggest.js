const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class suggest extends Command {
    constructor() {
        super({
            name: 'suggest',
            aliases: ['suggest'],
            description: 'suggest what should `NL Fallentaco#9340` add',
            usage: '!suggest <question>'
        })
    }

    async run(client, message, args) {
        const words = args.join(' ');
        if (!words) return message.channel.send('Please provide a suggestion!');
        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setFooter("React to vote")
            .setTitle(`Suggestion created by ${message.author.tag}`)
            .setDescription(words);
        message.channel.send('Thank you for suggesting. Please wait until the owner adds this feature.')

        try {
            const suggestion = await client.channels.get('458998718981734410').send(embed);
            await suggestion.react("⛔");
            await suggestion.react("✅");
        } catch (e) {
            console.log(e);
        }
    }
    // module.exports.help = {
    //     name: 'suggest',
    //     usage: 'suggest <question>',
    //     description: 'suggest what should `NL Fallentaco#9340` add'
    // }
}
module.exports = suggest;