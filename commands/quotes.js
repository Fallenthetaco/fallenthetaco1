const {
    Command
} = require('djs-easy-command');
const { Attachment } = require('discord.js');
const Discord = require('discord.js');

class quote extends Command {
    constructor() {
        super({
            name: 'quote',
            aliases: ['quote'],
            description: 'Make a quote',
            usage: '!quote <quote>',
            category: 'fun',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
  async run (client, message, args) {
    if (message.deletable) {
      message.delete();
    }
    let got = args.join(' ');
    const fail = new Discord.RichEmbed()
    .setColor('#36393E')
    .setDescription('You need to provide a quote that you want to quote on.')
    if (!got) return message.channel.send(fail);
      let url = `https://purrbot.site/api/quote?text=${got}&name=${message.author.username}&avatar=${message.author.avatarURL}`
      let done = url.replace(/ /g, '%20');
      const embed = new Discord.RichEmbed()
      .setColor('#36393E')
      .setDescription(`Quote Created By: <@${message.author.id}> in channel <#${message.channel.id}>`)
      .setImage(done)
      message.channel.send(embed);
  }
}
module.exports = quote;
