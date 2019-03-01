const Discord = require('discord.js');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class avatar extends Command {
    constructor() {
        super({
            name: 'avatar',
            aliases: ['av'],
            description: 'Shows your/others profile picture',
            usage: '!avatar @user',
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
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **avatar** command`)
            mentionHook.send(webhook);

            let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.member(message.author);
            const missing = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('I am missing the permission "Attach Files"!!')
            if (!message.guild.me.permissions.has('ATTACH_FILES')) return message.channel.send(missing);
            const missing = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('I am missing the permission "Embed Links"!!')
            if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send(missing);
            let mess = await message.channel.send("Loading image...");
            const embed = new Discord.RichEmbed()
                .setImage(`${member.user.avatarURL}`)
                .setDescription(`Here is ${member}'s avatar`)
                .setColor(`#36393E`)
            message.channel.send(embed);
            mess.delete();
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setFooter(`Command: avatar in ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'avatar',
    //     description: 'Shows your/others profile picture',
    //     usage: 'avatar (user)'
    // }
}
module.exports = avatar;
