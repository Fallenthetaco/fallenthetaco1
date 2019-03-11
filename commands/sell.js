const {
    Command
} = require('djs-easy-command');
const Discord = require('discord.js');
const eco = require('discord-economy');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class sell extends Command {
    constructor() {
        super({
            name: 'sell',
            aliases: ['sell'],
            category: 'economy',
            description: "Sells any items you have.",
            usage: '!sell <amount> <item>',
            owner: false
        })
    }
    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.tag} used the **sell** command`)
        mentionHook.send(webhook);
      client.blocks.ensure('blacklist', []);
      const people = client.blocks.get('blacklist');
            if (people.includes(message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');
        client.items.ensure(message.author.id, {
            tacos: 0,
            plastics: 0,
            burritos: 0,
            nachos: 0,
            rusty_cans: 0,
            quesadillas: 0
        });
        const items = client.items.get(message.author.id);
        const amount = args[0];
        const embed = new Discord.RichEmbed()
        .setColor('#36393E')
        .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
        .setDescription('You must provide an amount that is higher than 0')
        if (amount < 0) return message.channel.send(embed);
        const amounts = parseInt(amount);
        const nan = new Discord.RichEmbed()
        .setColor('#36393E')
        .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
        .setDescription('You need to provide a valid amount you want to sell')
        if (!Number.isInteger(amounts)) return message.channel.send(nan);
        const item = args.slice(1).join(' ');
        const itemFail = new Discord.RichEmbed()
        .setColor('#36393E')
        .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
        .setDescription('You need to provide an item you want to sell')
        if (!item) return message.channel.send(itemFail);

        if (item === 'tacos') {
            let totals = items.tacos - amounts;
            const itemsFail = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You don\'t have this much items.')
            if (totals < 0) return message.channel.send(itemsFail);
            let total = parseInt(totals);
            let money = 180;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            const notEnough = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You do not have this item so you can\'t sell it.')
            if (items.tacos === 0) return message.channel.send(notEnough);
            client.items.setProp(message.author.id, 'tacos', total);
            eco.AddToBalance(message.author.id, money);
            const success = new Discord.RichEmbed()
            .setDescription(`You have sold these for ${totalAmount} 🌮`)
            .setColor('#36393E')
            return message.channel.send(success);
        } else if (item === 'plastics') {
            let totals = items.plastics - amounts;
            const itemsFail = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You don\'t have this much items.')
            if (totals < 0) return message.channel.send(itemsFail);
            let total = parseInt(totals);
            let money = 60;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            const notEnough = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You do not have this item so you can\'t sell it.')
            if (items.plastics === 0) return message.channel.send(notEnough);
            client.items.setProp(message.author.id, 'plastics', total);
            eco.AddToBalance(message.author.id, money);
            const success = new Discord.RichEmbed()
            .setDescription(`You have sold these for ${totalAmount} 🌮`)
            .setColor('#36393E')
            return message.channel.send(success);
        } else if (item === 'burritos') {
            let totals = items.burritos - amounts;
            const itemsFail = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You don\'t have this much items.')
            if (totals < 0) return message.channel.send(itemsFail);
            let total = parseInt(totals);
            let money = 240;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            const notEnough = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You do not have this item so you can\'t sell it.')
            if (items.burritos === 0) return message.channel.send(notEnough);
            client.items.setProp(message.author.id, 'burritos', total);
            eco.AddToBalance(message.author.id, money);
            const success = new Discord.RichEmbed()
            .setDescription(`You have sold these for ${totalAmount} 🌮`)
            .setColor('#36393E')
            return message.channel.send(success);
        } else if (item === 'nachos') {
            let totals = items.nachos - amounts;
            const itemsFail = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You don\'t have this much items.')
            if (totals < 0) return message.channel.send(itemsFail);
            let total = parseInt(totals);
            let money = 300;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            const notEnough = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You do not have this item so you can\'t sell it.')
            if (items.nachos === 0) return message.channel.send(notEnough);
            client.items.setProp(message.author.id, 'nachos', total);
            eco.AddToBalance(message.author.id, money);
            const success = new Discord.RichEmbed()
            .setDescription(`You have sold these for ${totalAmount} 🌮`)
            .setColor('#36393E')
            return message.channel.send(success);
        } else if (item === 'rusty cans') {
            let totals = items.rusty_cans - amounts;
            const itemsFail = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You don\'t have this much items.')
            if (totals < 0) return message.channel.send(itemsFail);
            let total = parseInt(totals);
            let money = 120;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            const notEnough = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You do not have this item so you can\'t sell it.')
            if (items.rusty_cans === 0) return message.channel.send(notEnough);
            client.items.setProp(message.author.id, 'rusty_cans', total);
            eco.AddToBalance(message.author.id, money);
            const success = new Discord.RichEmbed()
            .setDescription(`You have sold these for ${totalAmount} 🌮`)
            .setColor('#36393E')
            return message.channel.send(success);
        } else if (item === 'quesadillas') {
            let totals = items.quesadillas - amounts;
            const itemsFail = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You don\'t have this much items.')
            if (totals < 0) return message.channel.send(itemsFail);
            let total = parseInt(totals);
            let money = 360;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            const notEnough = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}sell <amount> <item>`)
            .setDescription('You do not have this item so you can\'t sell it.')
            if (items.quesadillas === 0) return message.channel.send(notEnough);
            client.items.setProp(message.author.id, 'quesadillas', total);
            eco.AddToBalance(message.author.id, money);
            const success = new Discord.RichEmbed()
            .setDescription(`You have sold these for ${totalAmount} 🌮`)
            .setColor('#36393E')
            return message.channel.send(success);
        } else {
          const embed = new Discord.RichEmbed()
          .setColor('#36393E')
          .setDescription('Please choose between `tacos`, `burritos`, `plastics`, `nachos`, `rusty cans`, or `quesadillas`')
            return message.channel.send(embed)
        }
    }
}
module.exports = sell;
