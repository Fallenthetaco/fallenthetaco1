const eco = require('discord-economy');
const config = require('../config.json');
const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class daily extends Command {
    constructor() {
        super({
            name: 'daily',
            aliases: ['d'],
            category: 'economy',
            description: 'Claim your daily tacos',
            usage: '!daily',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setTimestamp()
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **daily** command`)
        mentionHook.send(webhook);
        try {
            client.jobs.ensure(message.author.id, 'Taco Bell Employee');
            client.items.ensure(message.author.id, {
                name: message.author.username,
                tacos: 0,
                plastics: 0,
                burritos: 0,
                nachos: 0,
                rusty_cans: 0,
                quesadillas: 0
            })
            const jobs = client.jobs.get(message.author.id);
      const people = client.blocks.get('blacklist');
            if (people.includes(message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');
            eco.Daily(message.author.id).then(l => {
                if (l.updated) {
                    // eco.AddToBalance(message.author.id, 500);
                    if (jobs === 'Taco Bell Employee') {
                        // eco.AddToBalance(message.author.id, 1000);
                        eco.AddToBalance(message.author.id, 2000);
                    } else if (jobs === 'Operations Engineer') {
                        // eco.AddToBalance(message.author.id, 1500);
                        eco.AddToBalance(message.author.id, 3000);
                    } else if (jobs === 'Packaging Engineer') {
                        // eco.AddToBalance(message.author.id, 2500);
                        eco.AddToBalance(message.author.id, 5000);
                    } else if (jobs === 'Associate R Manager') {
                        // eco.AddToBalance(message.author.id, 3700);
                        eco.AddToBalance(message.author.id, 7400);
                    } else if (jobs === 'Assistant General Manager') {
                        // eco.AddToBalance(message.author.id, 5500);
                        eco.AddToBalance(message.author.id, 11000);
                    } else if (jobs === 'R General Manager') {
                        // eco.AddToBalance(message.author.id, 8000);
                        eco.AddToBalance(message.author.id, 16000);
                    } else if (jobs === 'Shift Manager') {
                        // eco.AddToBalance(message.author.id, 10500);
                        eco.AddToBalance(message.author.id, 21000);
                    } else if (jobs === 'Tacobell Mafia Boss') {
                        // eco.AddToBalance(message.author.id, 15000);
                        eco.AddToBalance(message.author.id, 30000);
                    }
                    eco.FetchBalance(message.author.id).then(x => {
                        const embed = new Discord.RichEmbed()
                            .setColor(`#36393E`)
                            .setDescription(`<@${message.author.id}>, You claimed your daily tacos successfully! Since you are **${jobs}**, you now own **${x.balance.toLocaleString()}** 🌮.`);
                        message.channel.send(embed);
                    });

                } else {

                    const embed = new Discord.RichEmbed()
                        .setColor(`#36393E`)
                        .setDescription(`Sorry, you already claimed your daily tacos! Please come back in ${l.timetowait}.`);
                    message.channel.send(embed);
                }
            });
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`Command: daily ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'daily',
    //     description: 'Claim your daily tacos',
    //     usage: 'daily'
    // }
}
module.exports = daily;
