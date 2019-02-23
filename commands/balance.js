const Discord = require('discord.js');
const eco = require('discord-economy');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class balance extends Command {
    constructor() {
        super({
            name: 'balance',
            aliases: ['bal'],
            description: 'Shows your balance',
            usage: '!balance @user',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
        try {
          const webhook = new Discord.RichEmbed()
          .setColor('#36393E')
          .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **balance** command`)
            mentionHook.send(webhook);
      const people = client.blocks.get('blacklist');
            if (people.includes(message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');
          let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.member(message.author);
            client.jobs.ensure(member.id, 'Taco Bell Employee');
            //taco", "burrito", "quesadilla", "nachos", "rusty can", 'plastic'
            client.items.ensure(member.id, {
                tacos: 0,
                plastics: 0,
                burritos: 0,
                nachos: 0,
                rusty_cans: 0,
                quesadillas: 0
            })
            let job = client.jobs.get(member.id);
            eco.FetchBalance(member.id).then(l => {
              const missing = new Discord.RichEmbed()
              .setColor('#36393E')
              .setDescription('I am missing the permission "Embed Links"!!')
              if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send(missing);
                const embed = new Discord.RichEmbed()
                    .setDescription(`**${message.guild.name} Bank**`)
                    .setColor(`#36393E`)
                    .addField('Account Holder:', member, true)
                    .addField('Account Balance:', `${l.balance.toLocaleString()} 🌮`, true)
                    .addField('Job:', job)
                message.channel.send(``, embed)
            });
            message.channel.send('If you are new to the bot... Please do `!start` to get your 1000 tacos for free.')
            message.channel.send("Remember to do `!support` to join the official bot server to get daily updates on <@436047056394649600>. Please don't miss out on events thats happening on the official server")
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setFooter(`Command: balance ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'balance',
    //     description: 'Shows your balance',
    //     usage: 'balance @user'
    // }
}
module.exports = balance;
