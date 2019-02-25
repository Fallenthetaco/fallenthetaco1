const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const math = require('mathjs');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");

class calc extends Command {
    constructor() {
        super({
            name: 'calc',
            usage: '!calc <whatever>',
            description: 'Calculates anything',
            aliases: ['!calc'],
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **calc** command`)
        mentionHook.send(webhook);
      const argsFail = new Discord.RichEmbed()
      .setColor('#36393E')
      .setDescription('Please put in a calculation.')
      if (!args[0]) return message.channel.send(argsFail);
      let rasp;
      try {
        rasp = math.eval(args.join(' '));
      } catch (e) {
        const fail = new Discord.RichEmbed()
        .setColor('#36393E')
        .setDescription('Please put in a valid calculation.');
        return message.channel.send(fail);
      }
      const embed = new Discord.RichEmbed()
      .setColor('#36393E')
      .setTitle('Math Calculation')
      .addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
      .addField('Output', `\`\`\`js\n${rasp}\`\`\``)
      message.channel.send(embed);
    }
}
module.exports = calc;
