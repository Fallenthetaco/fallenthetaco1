const eco = require('discord-economy');
const config = require('../config.json');
const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class leaderboard extends Command {
    constructor() {
        super({
            name: 'leaderboard',
            aliases: ['lb'],
            category: 'economy',
            description: 'Shows the top 11 in the leaderboard',
            usage: '!leaderboard',
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
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **leaderboard** command`)
            mentionHook.send(webhook);
      const people = client.blocks.get('blacklist');
            if (people.includes(message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');

            if (message.mentions.users.last()) {

                eco.Leaderboard({
                    search: message.mentions.users.first().id
                }).then(l => {
                  const find = new Discord.RichEmbed()
                  .setColor('#36393E')
                  .setDescription(`The user ${message.mentions.users.last().tag} is number ${l} on my leaderboard!`)
                    message.channel.send(find);
                })

                //Searches for the top 3 and outputs it to the user.
            } else {
                //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
                eco.Leaderboard({
                    limit: 11
                }).then(async users => {
                    var i;
                    const leaderboard = new Discord.RichEmbed()
                        .setColor(`#36393E`)
                        .setAuthor('Top 10 Leaderboard')
                        .setFooter('#0 is the top player on the leaderboard not #1')
                    for (i = 0; i < 11; i++) {
                        await client.fetchUser(users[i].userid).then(fetched => {
                            leaderboard.addField(`${i} - ${fetched.tag}:`, `${Number(users[i].balance).toLocaleString()} 🌮`, true)
                        });
                    }
                    message.channel.send(leaderboard)

                });
            }
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`Command: leaderboard ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
        // client.channels.get(config.channelId).send(`${message.author.username}#${message.author.discriminator} used the **leaderboard** command in the server: ${message.guild.name} (${message.guild.id})`);
    }
    // module.exports.help = {
    //     name: 'leaderboard',
    //     description: 'Shows the top 3 in the leaderboard',
    //     usage: 'leaderboard'
    // }
}
module.exports = leaderboard;
