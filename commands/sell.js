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
            description: "Sells any items you have.",
            usage: '!sell <amount> <item>',
            owner: false
        })
    }
    async run(client, message, args) {
        mentionHook.send(`${message.author.tag} used the **sell** command in the server: ${message.guild.name} (${message.guild.id})`);
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
        if (amount < 0) return message.channel.send('You must provide an amount that is higher than 0');
        const amounts = parseInt(amount);
        if (!Number.isInteger(amounts)) return message.channel.send('You need to provide a valid amount you want to sell');
        const item = args.slice(1).join(' ');
        if (!item) return message.channel.send('You need to provide an item you want to sell');

        if (item === 'tacos') {
            let totals = items.tacos - amounts;
            if (totals < 0) return message.channel.send('You don\'t have this much items.');
            let total = parseInt(totals);
            let money = 180;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            if (items.tacos === 0) return message.channel.send('You do not have this item so you can\'t sell it.');
            client.items.setProp(message.author.id, 'tacos', total);
            eco.AddToBalance(message.author.id, money);
            return message.channel.send(`You have sold these for ${totalAmount} 🌮`);
        } else if (item === 'plastics') {
            let totals = items.plastics - amounts;
            if (totals < 0) return message.channel.send('You don\'t have this much items.');
            let total = parseInt(totals);
            let money = 60;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            if (items.plastics === 0) return message.channel.send('You do not have this item so you can\'t sell it.');
            client.items.setProp(message.author.id, 'plastics', total);
            eco.AddToBalance(message.author.id, money);
            return message.channel.send(`You have sold these for ${totalAmount} 🌮`);
        } else if (item === 'burritos') {
            let totals = items.burritos - amounts;
            if (totals < 0) return message.channel.send('You don\'t have this much items.');
            let total = parseInt(totals);
            let money = 240;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            if (items.burritos === 0) return message.channel.send('You do not have this item so you can\'t sell it.');
            client.items.setProp(message.author.id, 'burritos', total);
            eco.AddToBalance(message.author.id, money);
            return message.channel.send(`You have sold these for ${totalAmount} 🌮`);
        } else if (item === 'nachos') {
            let totals = items.nachos - amounts;
            if (totals < 0) return message.channel.send('You don\'t have this much items.');
            let total = parseInt(totals);
            let money = 300;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            if (items.nachos === 0) return message.channel.send('You do not have this item so you can\'t sell it.');
            client.items.setProp(message.author.id, 'nachos', total);
            eco.AddToBalance(message.author.id, money);
            return message.channel.send(`You have sold these for ${totalAmount} 🌮`);
        } else if (item === 'rusty cans') {
            let totals = items.rusty_cans - amounts;
            if (totals < 0) return message.channel.send('You don\'t have this much items.');
            let total = parseInt(totals);
            let money = 120;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            if (items.rusty_cans === 0) return message.channel.send('You do not have this item so you can\'t sell it.');
            client.items.setProp(message.author.id, 'rusty_cans', total);
            eco.AddToBalance(message.author.id, money);
            return message.channel.send(`You have sold these for ${totalAmount} 🌮`);
        } else if (item === 'quesadillas') {
            let totals = items.quesadillas - amounts;
            if (totals < 0) return message.channel.send('You don\'t have this much items.');
            let total = parseInt(totals);
            let money = 360;
            let multiply = money * amounts
            let totalAmount = parseInt(multiply);
            if (items.quesadillas === 0) return message.channel.send('You do not have this item so you can\'t sell it.');
            client.items.setProp(message.author.id, 'quesadillas', total);
            eco.AddToBalance(message.author.id, money);
            return message.channel.send(`You have sold these for ${totalAmount} 🌮`);
        } else {
            return message.channel.send('Please choose between `tacos`, `burritos`, `plastics`, `nachos`, `rusty cans`, or `quesadillas`')
        }
    }
}
module.exports = sell;  