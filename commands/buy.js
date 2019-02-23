const Discord = require('discord.js');
const fs = require('fs');
const eco = require('discord-economy');
const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class buy extends Command {
    constructor() {
        super({
            name: 'buy',
            aliases: ['buy'],
            description: 'Buys anything on the shop',
            usage: '!buy <whatever in shop>',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
        try {
            client.job.ensure(message.author.id, ['Taco Bell Employee']);
            client.jobs.ensure(message.author.id, 'Taco Bell Employee');
            client.items.ensure(message.author.id, {
                tacos: 0,
                plastics: 0,
                burritos: 0,
                nachos: 0,
                rusty_can: 0,
                quesadilla: 0
            })
            const peoples = client.jobs.get(message.author.id);
            const job = client.job.get(message.author.id);
            const webhook = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
            .setDescription(`${message.author.username}#${message.author.discriminator} used the **buy** command`)
              mentionHook.send(webhook);
      client.blocks.ensure('blacklist', []);
      const people = client.blocks.get('blacklist');
            if (people.includes(message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');

            let categories = []; // Lets define categories as an empty array so we can add to it.

            // We want to make it so that if the item is not specified it shows a list of items
            if (!args.join(" ")) { // Run if no item specified...
                // client.channels.get(config.channelId).send(`${message.author.username}#${message.author.discriminator} used the **buy** command in the server: ${message.guild.name} (${message.guild.id})`);
                // First, we need to fetch all of the categories.
                message.channel.send("You need to join the support server *by doing **`!support`*** to suggest what item should be added to shop. More items will soon be added after I got enough suggestions.");
                for (var i in items) { // We can do this by creating a for loop.
                    // Then, lets push the category to the array if it's not already in it.
                    if (!categories.includes(items[i].type)) {
                        categories.push(items[i].type)
                    }

                }

                // Now that we have the categories we can start the embed
                const embed = new Discord.RichEmbed()
                    .setDescription(`Available Items`)
                    .setColor(`#36393E`)
                    .setFooter(`**Usage: !buy <item>**`)
                for (var i = 0; i < categories.length; i++) { // This runs off of how many categories there are. - MAKE SURE YOU DELETE THAT = IF YOU ADDED IT.

                    var tempDesc = '';

                    for (var c in items) { // This runs off of all commands
                        if (categories[i] === items[c].type) {

                            tempDesc += `**${items[c].name}** - ${items[c].price.toLocaleString()} 🌮 - ${items[c].desc}\n`; // Remember that \n means newline

                        }

                    }

                    // Then after it adds all the items from that category, add it to the embed
                    embed.addField(`__${categories[i]}__`, tempDesc);

                }

                // Now we need to send the message, make sure it is out of the for loop.
                return message.channel.send({
                    embed
                }); // Lets also return here.

                // Lets test it! x2

            }

            // Buying the item.

            // Item Info
            let itemName = '';
            let itemPrice = 0;
            let itemDesc = '';

            for (var i in items) { // Make sure you have the correct syntax for
                if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) { // If item is found, run ..
                    itemName = items[i].name;
                    itemPrice = items[i].price;
                    itemDesc = items[i].desc;
                }
            }
            if (itemName === peoples) return message.channel.send('Sorry you can\'t buy that job since you already have it.');
            if (job.includes(itemName)) return message.channel.send('Sorry, but you can\'t buy a job that you already purchased before.');
            if (itemName === "Packaging Engineer") {
                if (!job.includes('Operations Engineer')) return message.channel.send('Sorry, but you\'ll need to buy `Operations Engineer` in order to get this job.');
            }
            if (itemName === "Associate R Manager") {
                if (!job.includes('Packaging Engineer')) return message.channel.send('Sorry, but you\'ll need to buy `Packaging Engineer` in order to get this job.');
            }
            if (itemName === "Assistant General Manager") {
                if (!job.includes('Associate R Manager')) return message.channel.send('Sorry, but you\'ll need to buy `Associate R Manager` in order to get this job.');
            }
            if (itemName === "R General Manager") {
                if (!job.includes('Assistant General Manager')) return message.channel.send('Sorry, but you\'ll need to buy `Assistant General Manager` in order to get this job.');
            }
            if (itemName === "Shift Manager") {
                if (!job.includes('R General Manager')) return message.channel.send('Sorry, but you\'ll need to buy `R General Manager` in order to get this job.');
            }
            if (itemName === "Tacobell Mafia Boss") {
                if (!job.includes('Shift Manager')) return message.channel.send('Sorry, but you\'ll need to buy `Shift Manager` in order to get this job.');
            }
            // If the item wasn't found, itemName won't be defined
            if (itemName === '') {
                // client.channels.get(config.channelId).send(`${message.author.username}#${message.author.discriminator} used the **buy** command in the server: ${message.guild.name} (${message.guild.id})`);
                return message.channel.send(`**Item ${args.join(" ").trim()} not found.**`)
            }

            // Now, lets check if they have enough money.
            eco.FetchBalance(message.author.id).then((l) => {

                if (itemPrice > l.balance) { // It's supposed to be like this instead...
                    return message.channel.send(`**You don't have enough 🌮 for this item.**`);
                }
                let breakChance = 40;
                let refundAmount = 50;
                let breakMessage = 'Your item broke during transportation srry buddy.';

                let broken = Math.floor(Math.random() + (100 - 1 + 1) + 1);

                if (broken <= breakChance) {
                    eco.AddToBalance(message.author.id, parseInt(`${itemPrice}`) * `0.${refundAmount}`).then((i) => {
                        message.channel.send(breakMessage);
                    });
                    return;
                }


                eco.SubstractFromBalance(message.author.id, parseInt(`${itemPrice}`)).then((i) => {
                    message.channel.send('**You bought ' + itemName + '!**');

                    // You can have IF statements here to run something when they buy an item.
                    if (itemName === "Operations Engineer") {
                        client.jobs.set(message.author.id, 'Operations Engineer');
                        client.job.push(message.author.id, 'Operations Engineer');
                        if (message.guild.id === '446775078240387093') {
                            let rold = message.guild.roles.find("name", "Operations Engineer");
                            let target = message.guild.members.get(message.author.id);
                            if (target.roles.has(rold.id));
                            target.addRole(rold.id);
                        }
                    }
                    if (itemName === "Packaging Engineer") {
                        client.jobs.set(message.author.id, 'Packaging Engineer');
                        client.job.push(message.author.id, 'Packaging Engineer');
                        if (message.guild.id === '446775078240387093') {
                            let rold = message.guild.roles.find("name", "Packaging Engineer");
                            let target = message.guild.members.get(message.author.id);
                            if (target.roles.has(rold.id));
                            target.addRole(rold.id);
                        }
                    }
                    if (itemName === "Associate R Manager") {
                        client.jobs.set(message.author.id, 'Associate R Manager');
                        client.job.push(message.author.id, 'Associate R Manager');
                        if (message.guild.id === '446775078240387093') {
                            let rold = message.guild.roles.find("name", "Associate R Manager");
                            let target = message.guild.members.get(message.author.id);
                            if (target.roles.has(rold.id));
                            target.addRole(rold.id);
                        }
                    }
                    if (itemName === "Assistant General Manager") {
                        client.jobs.set(message.author.id, 'Assistant General Manager');
                        client.job.push(message.author.id, 'Assistant General Manager');
                        if (message.guild.id === '446775078240387093') {
                            let rold = message.guild.roles.find("name", "Assistant General Manager");
                            let target = message.guild.members.get(message.author.id);
                            if (target.roles.has(rold.id));
                            target.addRole(rold.id);
                        }
                    }
                    if (itemName === "R General Manager") {
                        client.jobs.set(message.author.id, 'R General Manager');
                        client.job.push(message.author.id, 'R General Manager');
                        if (message.guild.id === '446775078240387093') {
                            let rold = message.guild.roles.find("name", "R General Manager");
                            let target = message.guild.members.get(message.author.id);
                            if (target.roles.has(rold.id));
                            target.addRole(rold.id);
                        }
                    }
                    if (itemName === "Shift Manager") {
                        client.jobs.set(message.author.id, 'Shift Manager');
                        client.job.push(message.author.id, 'Shift Manager');
                        if (message.guild.id === '446775078240387093') {
                            let rold = message.guild.roles.find("name", "Shift Manager");
                            let target = message.guild.members.get(message.author.id);
                            if (target.roles.has(rold.id));
                            target.addRole(rold.id);
                        }
                    }
                    if (itemName === "Tacobell Mafia Boss") {
                        client.jobs.set(message.author.id, 'Tacobell Mafia Boss');
                        client.job.push(message.author.id, 'Tacobell Mafia Boss');
                        if (message.guild.id === '446775078240387093') {
                            let rold = message.guild.roles.find("name", "Tacobell Mafia Boss");
                            let target = message.guild.members.get(message.author.id);
                            if (target.roles.has(rold.id));
                            target.addRole(rold.id);
                        }
                    }
                });
            });
        } catch (e) {

            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`Command: buy ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'buy',
    //     description: 'Buys anything on the shop',
    //     usage: 'buy <whatever in shop>'
    // }
}
module.exports = buy;
