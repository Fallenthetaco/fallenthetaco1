const config = require('../config.json');
const Discord = require("discord.js");
const terminal = require('node-cmd');
const util = require('util');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class Eval extends Command {
    constructor() {
        super({
            name: 'eval',
            aliases: ['e'],
            description: 'Owner Command',
            usage: '!eval [bash] <code>',
            owner: true,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('You are not the owner of the bot to use this command!!');
        if (message.author.id !== config.ownerID) return message.channel.send(embed);
      const fail = new Discord.RichEmbed()
      .setColor('#36393E')
      .setDescription('Please provide a code that I can run on');
        if (!args[0]) return message.channel.send(fail);
        if (args[0].toLowerCase() == 'bash') {
            let hrDiff
            const hrStart = process.hrtime()
            terminal.get(args.slice(1).join(' '), (err, data) => {
                hrDiff = process.hrtime(hrStart)
              const embed = new Discord.RichEmbed()
              .setColor('#36393E')
              .setDescription(`Error while evaluating: \`${err}\``)
                if (err) return message.channel.send(embed)
                return message.channel.send(`
*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
\`\`\`md
${data}
\`\`\`
				`, {
                    maxLength: 1900,
                });
            })
        } else {
            let result
            let hrDiff;
            try {
                const hrStart = process.hrtime();
                result = eval(args.join(' '));
                hrDiff = process.hrtime(hrStart);
            } catch (err) {
              const embed = new Discord.RichEmbed()
              .setColor('#36393E')
              .setDescription(`Error while evaluating: \`${err}\``)
                return message.channel.send(embed)
            }
            const inspected = util.inspect(result, {
                depth: 0
            })
            return message.channel.send(`
*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
\`\`\`javascript
${inspected}
\`\`\`
			`, {
                maxLength: 1900,
            });
        }
    }
}
// module.exports.help = {
//     name: 'eval',
//     description: 'Shows a code that you sent in Discord',
//     usage: 'eval (any code)'
// }
module.exports = Eval;