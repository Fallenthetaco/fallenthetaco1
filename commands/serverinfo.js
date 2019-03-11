const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const channelId = config.channelId;
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class serverinfo extends Command {
    constructor() {
        super({
            name: 'serverinfo',
            aliases: ['si'],
            category: 'util',
            description: `Shows the server's information`,
            usage: '!serverinfo'
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.tag} used the **serverinfo** command`)
        mentionHook.send(webhook);
        let channels = message.guild.channels.filter(s => s.type === 'text');
        let voice = message.guild.channels.filter(s => s.type === 'voice');
        const guildOwner = await message.guild.fetchMember(message.guild.ownerID).then(owner => owner.user.tag).catch(err => console.error(err));
        const roles = message.guild.roles.filter(r => r.name !== "@everyone").map(r => `<@&${r.id}>`).join(', ');
        if (roles.length > 1024) {
            const embeddddddddddddddddddddddddddddddddddddddd = new Discord.RichEmbed()
                .setThumbnail(message.guild.iconURL)
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setColor(`#36393E`)
                .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL)
                .addField('Members:', `${message.guild.members.filter(member => !member.user.bot).size} members`, true)
                .addField('Bots:', `${message.guild.members.filter(member => member.user.bot).size} bots`, true)
                .addField('Channels', channels.size, true)
                .addField('Voice Channels', voice.size, true)
                .addField('Owner', `${guildOwner}`, true)
                .addField('ID', message.guild.id, true)
                .addField('Region', message.guild.region, true)
                .addField('Created at:', message.guild.createdAt, true)
            message.channel.send(embeddddddddddddddddddddddddddddddddddddddd)
        } else {
            try {
                const embeddddddddddddddddddddddddddddddddddddddd = new Discord.RichEmbed()
                    .setThumbnail(message.guild.iconURL)
                    .setAuthor(message.guild.name, message.guild.iconURL)
                    .setColor(`#36393E`)
                    .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL)
                    .addField('Members:', `${message.guild.members.filter(member => !member.user.bot).size} members`, true)
                    .addField('Bots:', `${message.guild.members.filter(member => member.user.bot).size} bots`, true)
                    .addField('Channels', channels.size, true)
                    .addField('Voice Channels', voice.size, true)
                    .addField('Owner', `${guildOwner}`, true)
                    .addField('ID', message.guild.id, true)
                    .addField('Region', message.guild.region, true)
                    .addField('Created at:', message.guild.createdAt, true)
                    .addField('Roles', roles, true)
                message.channel.send(embeddddddddddddddddddddddddddddddddddddddd);

            } catch (e) {
                console.log(e);
            }
        }
    }

    // module.exports.help = {
    //     name: "serverinfo",
    //     description: 'Shows the servers information',
    //     usage: 'serverinfo'
    // }
}
module.exports = serverinfo;
