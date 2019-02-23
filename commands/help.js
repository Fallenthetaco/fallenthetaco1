const ownerID = process.env.ownerID
const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

const options = {
    limit: 15 * 1000,
    min: 1,
    max: 5,
    page: 1
}
class help extends Command {
    constructor() {
        super({
            name: 'help',
            aliases: ['h'],
            description: 'Shows all of the available commands that you can use',
            usage: '!help (command)',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.tag} used the **help** command`)
        mentionHook.send(webhook);
        var i;

        const prefix = client.guildPrefixes.get(message.guild.id);
      if (!prefix) client.guildPrefixes.set(message.guild.id, '!');
        if (!args[0]) {
            let com = [];
            let commandList = client.comman.get('command').map(c => {
                return `${prefix}${c.name} :: ${c.description}`
            }); //`!${c.name}${' '.repeat(longest - c.name.length)} :: ${c.description}`)
            const command = commandList.slice(0, 24).join('\n');
            const more = commandList.slice(25, commandList.length).join('\n');
            const randomColor = "000000".replace(function() {
                return (~~(Math.random() * 16)).toString(16);
            });
            const pages = {
                1: {
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `Requested by ${message.author.username}#${message.author.discriminator}`
                    },
                    timestamp: new Date(),
                    color: 333333,
                    title: "Click Here for Command List",
                    url: "https://fallenthetaco.glitch.me/commands",
                    description: `**${command}**`
                },
                2: {
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `Requested by ${message.author.username}#${message.author.discriminator}`
                    },
                    color: 333333,
                    timestamp: new Date(),
                    title: "Click Here for Command List",
                    url: "https://fallenthetaco.glitch.me/commands",
                    description: `**${more}**`
                }
            }
            let {
                min,
                max,
                page,
                limit
            } = options;

            try {
                const m = await message.channel.send({
                    embed: pages[options.page]
                });

                await m.react('⬅');
                await m.react('➡');
                await m.react('🗑');

                const filter = (reaction, user) => {
                    return ['⬅', '➡', '🗑'].includes(reaction.emoji.name) && user.id == message.author.id;
                };

                const awaitReactions = async (message, m, options, filter) => {
                    try {
                        // simplify the use of these options, using destructing^

                        m.awaitReactions(filter, {
                                max: 1,
                                time: limit,
                                errors: ['time']
                            })
                            .then(async (collected) => {
                                // logic
                                const reaction = collected.first();
                                if (reaction.emoji.name === '⬅') {
                                    try {
                                        await removeReaction(m, message, '⬅');


                                        if (page != min) {
                                            page = page - 1;
                                            await m.edit({
                                                embed: pages[page]
                                            });
                                        }
                                        awaitReactions(message, m, options, filter);
                                    } catch (e) {
                                        console.log(e);
                                    }
                                } else if (reaction.emoji.name === '➡') {
                                    // remove the back reaction if possible
                                    await removeReaction(m, message, '➡');

                                    // check if the page can go forward one
                                    if (page != max) {
                                        // change the page
                                        page = page + 1;
                                        await m.edit({
                                            embed: pages[page]
                                        });
                                    }

                                    // restart the listener
                                    awaitReactions(message, m, options, filter);
                                } else if (reaction.emoji.name === '🗑') {
                                    // trash the message instantly, returning so the listener fully stops
                                    return await m.delete();
                                } else {
                                    awaitReactions(message, m, options, filter);
                                };
                            }).catch(console.error);
                    } catch (e) {
                        console.error;
                    }
                }
                const removeReaction = async (m, message, emoji) => {
                    try {
                        m.reactions.find(r => r.emoji.name == emoji).users.remove(message.author.id);
                    } catch (err) {}
                }

                awaitReactions(message, m, options, filter);

            } catch (e) {
                console.log(e);
            }

        } else {
            let command = args[0];
          let commands = client.commands.get(command);
          if (commands) {
                command = client.commands.get(command);
            console.log(command);
                const embed = new Discord.RichEmbed()
                    .setAuthor(`${command.name} Command`)
                    .setColor('RANDOM')
                    .setDescription(`Description: ${command.description}\nUsage: **${command.usage}**`)
                    .setFooter(`Requested by: ${message.author.tag} (${message.author.id})`)
                    .setTimestamp()
                message.channel.send(embed)

            } else {
              const embed = new Discord.RichEmbed()
              .setColor('#36393E')
              .setDescription('This command doesn\'t exist');
              message.channel.send(embed)
            }
        }
    }
}
// module.exports.help = {
//     name: 'help',
//     description: 'Shows all of the available commands that you can use',
//     usage: 'help (command)'
// }
module.exports = help;
