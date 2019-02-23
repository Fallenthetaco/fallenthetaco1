const {
    Command
} = require('djs-easy-command');
const Discord = require('discord.js');
class Eightball extends Command {
    constructor() {
        super({
            name: '8ball',
            aliases: ['8ball'],
            description: 'Ask a question',
            usage: '!8ball <question>',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **8ball** command`)
        mentionHook.send(webhook);
      const fail = new Discord.RichEmbed()
      .setColor('#36393E')
      .setDescription('Please ask a full question for me to answer.');
    if (!args[0]) return message.channel.send(fail);
      let replies = ['Yes', 'No', 'Ask later please', 'How should I know'];
      let result = Math.floor((Math.random() * replies.length));
      let question = args.join(' ');

      let answered = new Discord.RichEmbed()
      .setColor('#36393')
      .setAuthor(message.author.tag)
      .addField('Question:', question)
      .addField('Answer:', replies[result]);
      message.channel.send(answered);
    }
}
module.exports = Eightball;
