const slots = ["🍔", "🍟", "🌭", "🍕", "🌮", "🍘", "🍫", "🍿", "🍩"];
const Discord = require("discord.js");
const eco = require('discord-economy');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class Slots extends Command {
    constructor() {
        super({
            name: 'slots',
            aliases: ['slots'],
            category: 'economy',
            description: 'A simple slot machine game',
            usage: '!slots <anount>',
            owner: false
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **slots** command`)
        mentionHook.send(webhook);
      client.blocks.ensure('blacklist', []);
      let people = client.blocks.get('blacklist');
            if (people.includes(message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');
        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('You have to provide an amount 1 🌮 or more.');
        const amount = args[0]
        if (amount < 1) return message.channel.send(embed);
        const numFail = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('Please provide a vaild amount.');
        if (isNaN(args[0])) return message.channel.send(numFail);

        const embedd = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('Please provide an amount you want to use for this game.');
        if (!amount) return message.channel.send(embedd);
        const embeddd = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription(`You don't have enough 🌮 to play the game.`);
        eco.FetchBalance(message.author.id).then((l) => {
            if (amount > l.balance) return message.channel.send(embeddd);
            try {
                eco.SubstractFromBalance(message.author.id, amount);
                const Mone = slots[Math.floor(Math.random() * slots.length)];
                const Mtwo = slots[Math.floor(Math.random() * slots.length)];
                const Mthree = slots[Math.floor(Math.random() * slots.length)];
                const Tone = slots[Math.floor(Math.random() * slots.length)];
                const Ttwo = slots[Math.floor(Math.random() * slots.length)];
                const Tthree = slots[Math.floor(Math.random() * slots.length)];
                const Bone = slots[Math.floor(Math.random() * slots.length)];
                const Btwo = slots[Math.floor(Math.random() * slots.length)];
                const Bthree = slots[Math.floor(Math.random() * slots.length)];

                if (Mone === Mtwo || Mone === Mthree || Mthree === Mtwo) {
                    if (Mone === Mtwo === Mthree) {
                        const triple = Math.floor(amount * 3);
                        eco.AddToBalance(message.author.id, triple);
                    }

                    const flakesPercent = Math.floor(amount * 2);

                    const embed = new Discord.RichEmbed()
                        .setTimestamp()
                        .setDescription(`${Tone} | ${Ttwo} | ${Tthree}\n${Mone} | ${Mtwo} | ${Mthree}\n${Bone} | ${Btwo} | ${Bthree}`)
                        .setColor("#43A047");
                    message.channel.send(embed);
                    eco.AddToBalance(message.author.id, flakesPercent);
                    eco.FetchBalance(message.author.id).then(i => {

                        const embed = new Discord.RichEmbed()
                            .setColor('RANDOM')
                            .setDescription(`${message.author} You just won $${flakesPercent}, you now have $${i.balance.toLocaleString()}!`)
                        message.channel.send(embed);
                    });
                } else {
                    const embedd = new Discord.RichEmbed()
                        .setTimestamp()
                        .setDescription(`${Tone} | ${Ttwo} | ${Tthree}\n${Mone} | ${Mtwo} | ${Mthree}\n${Bone} | ${Btwo} | ${Bthree}`)
                        .setColor("#d32f2f");
                    message.channel.send(embedd);
                    eco.FetchBalance(message.author.id).then(i => {
                        const embed = new Discord.RichEmbed()
                            .setColor('RANDOM')
                            .setDescription(`${message.author} You lost $${amount}, you now have $${i.balance.toLocaleString()}! Better luck next time!`);
                        message.channel.send(embed);
                    });

                }
            } catch (e) {
                const embed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setFooter(`Command: slots ${message.guild.name}`)
                    .setDescription(e);
                errorBot.send(embed);
            }
        });
    }

    // module.exports.help = {
    //     name: 'slots',
    //     description: 'A simple slot machine game',
    //     usage: 'slots <amount>'
    // }
}
module.exports = Slots;
