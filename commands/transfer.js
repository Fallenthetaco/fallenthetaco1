const eco = require('discord-economy');
const config = require('../config.json');
const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class transfer extends Command {
    constructor() {
        super({
            name: 'transfer',
            aliases: ['t'],
            category: 'economy',
            description: 'Transfer tacos with another member',
            usage: '!transfer <amount> @user'
        })
    }

    async run(client, message, args) {
        try {
          const webhook = new Discord.RichEmbed()
          .setColor('#36393E')
          .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **transfer** command`)
            mentionHook.send(webhook);
      client.blocks.ensure('blacklist', []);
      const people = client.blocks.get('blacklist');
            if (people.includes(message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');
            const embedd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('Specify the amount of tacos, you want to pay!');
            const amount = args[0]
            if (!amount) return message.channel.send(embedd)
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('Reply the user you want to send tacos to!')
            let user = message.mentions.members.last()
            if (!user) return message.channel.send(embed);
            const embeddd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You can not transfer tacos to a bot.')
            if (user.bot === true) return message.channel.send(embeddd)
            const yourselfFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You can not transfer tacos to yourself!')
            if (user.id === message.author.id) return message.channel.send(yourselfFail);
            const numFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You must provide a vaild amount of tacos!!');
            if (isNaN(args[0])) return message.channel.send(numFail);

            eco.FetchBalance(message.author.id).then((i) => {
                const embed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription(`<@${message.author.id}>, You have less tacos than the amount you want to transfer!`);
                if (i.balance < amount) return message.channel.send(embed);

            eco.Transfer(message.author.id, user.id, amount).then(l => {
                const embed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription(`<@${message.author.id}>, You have successfully transfered ${amount.toLocaleString()} tacos to <@${user.id}>. <@${user.id}>'s current balance is now ${l.ToUser.toLocaleString()} tacos`);
                message.channel.send(embed);
            });
          });
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`Command: transfer ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'transfer',
    //     description: 'Transfer tacos with another member',
    //     usage: 'transfer <amount> <someone>'
    // }
}
module.exports = transfer;
