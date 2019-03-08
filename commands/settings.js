const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class settings extends Command {
    constructor() {
        super({
            name: 'settings',
            aliases: ['setting'],
            description: 'Settings for your server',
            usage: '!settings set <options> <id>'
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **settings** command`)
        mentionHook.send(webhook);
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry, only the Administrator people of the server can use this command");
        if (args[1] === "channel") {
            const id = args[2];
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You must provide a channel id that exists');

            if (!message.guild.channels.get(id)) return message.channel.send(embed)
            client.channel.set(message.guild.id, `${id}`);
            return message.channel.send('You have successfully set the channel for me to send welcome messages to')
        } else if (args[1] === 'role') {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('Please provide the id of the role.')
            if (isNaN(args[2])) return message.channel.send(embed);
            const find = args[2];
            const role = message.guild.roles.get(find);
            const roleFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You must provide a role that exist!!');
            if (!role) return message.channel.send(roleFail);
            const emmbed = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You must provide a role that is under the bots role')
            if (role.position >= message.member.highestRole.position) return message.channel.send(emmbed)
            client.autoRole.set(message.guild.id, `${role.id}`);
            return message.channel.send('You have successfully added this role for autorole.');
        } else if (args[1] === 'message') {
            const messages = args.slice(2).join(` `);
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription('You must provide a message for new people to join. EX: `!settings set message Welcome to the server {guildname}, {tag}`')
            if (!messages) return message.channel.send(embed);
            client.message.set(message.guild.id, `${messages}`);
            return message.channel.send('You have successfully set a message for me to send when a member joins')
        } else if (args[1] === 'modlogs') {
          let logs = args[2];
          if (!logs) return message.channel.send('You must provide the channel id for me to log to.');
            if (message.channel.id === logs) {
              client.logs.set(message.guild.id, logs);
              message.channel.send(`You have successfully set the modlogs into <#${logs}>`)
            } else return message.channel.send(`The channel id ${logs} does not exist. Please retry with the correct channel id.`)
        } else if (args[0] === 'set') {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setAuthor("Settings Help")
                .setDescription('Options: channel, message, role')
                .setFooter('!settings set <options> <id>');
            message.channel.send(embed);
        } else if (args[0] === 'reset') {
            const channels = client.channel.has(message.guild.id)
            if (!client.channel.get(message.guild.id) || client.autoRole.get(message.guild.id) || client.message.get(message.guild.id)) return message.channel.send('You do not have anything set therefore you can not use this command.')
            client.autoRole.delete(message.guild.id);
            client.channel.delete(message.guild.id);
            client.message.delete(message.guild.id);
            message.channel.send('You have successfully reset the configurations set on this server');
        } else {
            const channel = client.channel.get(message.guild.id);
            const role = client.autoRole.get(message.guild.id);
            const messages = client.message.get(message.guild.id);
            const embed = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name}'s Current Settings`)
                .setColor(`#36393E`)
                .addField('Channel:', `<#${channel ? `${channel}`: 'none'}>`)
                .addField('Role:', `<@&${role ? `${role}`: 'none'}>`)
                .addField('Message:', `${messages ? `${messages}`: 'none'}`)
                .setFooter(message.guild.name, message.guild.iconURL)
            message.channel.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'settings',
    //     description: 'Settings for your server',
    //     usage: 'settings set <options> <id>'
    // }
}
module.exports = settings;
