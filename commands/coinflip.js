const eco = require('discord-economy');
const Discord = require('discord.js');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class coinflip extends Command {
    constructor() {
        super({
            name: 'coinflip',
            aliases: ['cf'],
            description: 'CoinFlip Heads or Tails',
            usage: '!coinflip <amount> <head or tails>',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
        mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **coinflip** command in the server: ${message.guild.name} (${message.guild.id})`);
      const people = client.blocks.get('blacklist');
            if (people.includes(message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');
        let prefix = client.guildPrefixes.get(message.guild.id);
        if (!prefix) client.guildPrefixes.set(message.guild.id, '!');
        var flip = args[1] //Heads or Tails
        var amount = args[0] //Coins to gamble
        try {
          const amountFail = new Discord.RichEmbed()
              .setColor("#36393E")
              .setDescription("Please provide an amount for me to gamble")
              .setFooter(`${prefix}coinflip <amount> <heads or tails>`)
            if (!amount) return message.channel.send(amountFail);
          const numFail = new Discord.RichEmbed()
              .setColor("#36393E")
              .setDescription("Please provide a valid amount!!");
            if (isNaN(args[0])) return message.channel.send(numFail);
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`${prefix}coinflip <amount> <heads or tails>`)
                .setDescription('Please tell me if you chose heads or tails!');
            if (!flip || !['heads', 'tails'].includes(flip)) return message.channel.send(embed); 

            eco.FetchBalance(message.author.id).then((i) => {
              const failAmount = new Discord.RichEmbed()
              .setColor('#36393E')
              .setDescription(`<@${message.author.id}>, You have less 🌮 than the amount you want to gamble!`)
                if (i.balance < amount) return message.channel.send(failAmount);

            eco.Coinflip(message.author.id, flip, amount).then(l => {
                const winorlose = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription(`<@${message.author.id}>, You ${l.output}! Your new balance is: ${l.newbalance.toLocaleString()} 🌮`);
                message.channel.send(winorlose);

            })
        }).catch(console.error)
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`Command: coinflip ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'coinflip',
    //     description: 'CoinFlip Heads or Tails',
    //     usage: 'coinflip <amount> <heads or tails>'
    // }
}
module.exports = coinflip;