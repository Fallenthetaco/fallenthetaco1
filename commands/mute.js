const fs = require('fs');
const Discord = require('discord.js');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class mute extends Command {
    constructor() {
        super({
            name: 'mute',
            aliases: ['mute'],
            description: 'Mutes the user',
            usage: '!mute @user (reason)',
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
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **mute** command`)
            mentionHook.send(webhook);
            if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('You do not have the permission **Manage Roles** to use this command');
            const embeddddddd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('Sorry, I am missing the **MANAGE ROLES** permission to use this command!');
            if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(embeddddddd);
            let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);

            const userFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You must mention a user or ID')
            if (!toMute) return message.channel.send(userFail);

            const yourselfFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You can not mute yourself!')
            if (toMute.id === message.author.id) return message.channel.send(yourselfFail);

            const highestPermFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You can not mute a member that has higher permissions than you!')
            if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send(highestPermFail);

            let role = message.guild.roles.find('name', 'Muted');
            if (!role) {
                try {
                    let role = await message.guild.createRole({
                        name: 'Muted',
                        color: '#000000',
                        permission: []
                    });
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(role, {
                            SEND_MESSAGE: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false
                        });
                    });
                } catch (e) {
                    console.log(e.stack);
                }
            }
            const muteFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('This user has already muted!!')
            if (toMute.roles.has(role.id)) return message.channel.send(muteFail);
            toMute.addRole(role);

            const mutedSuccess = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('I have muted this user!')
            message.channel.send(mutedSuccess);

            const DMmute = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription(`You have been muted in **${message.guild.name}**`)
            const failed = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('Since the user\'s DMs are blocked, he/she is muted from this server.')
            toMute.send(DMmute).catch(message.channel.send(failed));

        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`Command: mute ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'mute',
    //     description: 'This command mutes the user',
    //     usage: 'mute @user (reason)'
    // }
}
module.exports = mute;
