const ms = require('ms');
const Discord = require('discord.js');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class lock extends Command {
    constructor() {
        super({
            name: 'lock',
            aliases: ['l'],
            category: 'moderation',
            description: 'Locks the channel so only staff can see it',
            usage: '!lock <time> ',
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
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **lock** command`)
            mentionHook.send(webhook);
            const memberFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You do not have the permission **Manage Channels** to use this command')

            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(memberFail);
            const embeddd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('Sorry, I am missing the **MANAGE CHANNELS** permission to use this command!')
            if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(embeddd);

            if (!client.lockit) client.lockit = [];
            let time = args.join(' ');
            let validUnlocks = ['release', 'unlock'];

            const timeFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription(`You must set a duration for the lockdown in either hours, minutes or seconds`)
            if (!time) return message.channel.send(timeFail);

            if (validUnlocks.includes(time)) {
                message.channel.overwritePermissions(message.guild.id, {
                    READ_MESSAGES: null
                }).then(() => {
                    const lifted = new Discord.RichEmbed()
                        .setColor(`#36393E`)
                        .setDescription('Lockdown lifted.')
                    message.channel.send(lifted);
                    clearTimeout(client.lockit[message.channel.id]);
                    delete client.lockit[message.channel.id];
                }).catch(error => {
                    console.log(error);
                });
            } else {
                message.channel.overwritePermissions(message.guild.id, {
                    READ_MESSAGES: false
                }).then(() => {
                    const locked = new Discord.RichEmbed()
                        .setDescription(`Channel locked down for ${ms(ms(time), { long:true })}`)
                        .setColor(`#36393E`)
                    message.channel.send(locked).then(() => {
                        client.lockit[message.channel.id] = setTimeout(() => {
                            message.channel.overwritePermissions(message.guild.id, {
                                READ_MESSAGES: null
                            }).then(message.channel.send('Lockdown lifted.')).catch(console.error);
                            delete client.lockit[message.channel.id];
                        }, ms(time));

                    }).catch(error => {
                        console.log(error);
                    });
                });
            }
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setFooter(`Command: lock ${message.guild.name}`)
                .setDescription(e);
            client.channels.get('516482324456800256').send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'lock',
    //     description: 'Locks the channel so only staff can see it',
    //     usage: 'lock <time>'
    // }
}
module.exports = lock;
