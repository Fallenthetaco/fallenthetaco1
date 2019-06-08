const Discord = require('discord.js');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class neww extends Command {
    constructor() {
        super({
            name: 'new',
            aliases: ['n'],
            category: 'moderation',
            description: 'Support Ticket',
            usage: '!n (reason)',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
        if (message.guild.id !== "446775078240387093") return message.channel.send('You must join the support server (by doing `!support` and clicking the middle link) in order to use this command.');
        let lower = `${message.author.username}-${message.author.discriminator}`
        const use = lower.toLowerCase();
        if (message.guild.channels.find(c => c.name === use)) return message.channel.send('You already created a ticket, you must close your current one before making a new one.')
        const usser = message.author;
        let guild = client.guilds.get('446775078240387093');
        let role = guild.roles.find(c => c.name === "Member");
        const channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}`).then(channel => channel.setParent("463841242678034472"));
        channel.overwritePermissions(
            message.author, {
                'READ_MESSAGES': true
            }
        )
        channel.overwritePermissions(
            role, {
                'READ_MESSAGES': false
            }
        )
            const newChannel = new Discord.RichEmbed()
                .setColor('#36393E')
                .setAuthor(usser.tag, usser.displayAvatarURL)
                .setFooter('Support Ticket Created!')
                .addField('User', usser)
                .addField('ID', usser.id)
                .setDescription(`Hey ${usser.tag}, Thank you for contacting our **FallenTheTaco Customer Support Team**. We will address your ticket within 1 - 2 days after being created, however at most times, we may be extremely busy and responses may be delayed (NO ETA). We apologize for any inconvenience caused and hope to address your problem ASAP! If you have wish to close your ticket, please type \`!close\` here.`)
                .setTimestamp()
            await channel.send(newChannel);
            const newTicket = new Discord.RichEmbed()
                .setColor('#36393E')
                .setTimestamp()
                .setAuthor(`Hello, ${usser.username}`, usser.displayAvatarURL)
                .setDescription(`Check ${message.guild.channels.find(c => c.name === use)}`)
                .setFooter('Support Ticket Created!')
            await message.channel.send(newTicket).then(x => x.delete())
    }
}

module.exports = neww;