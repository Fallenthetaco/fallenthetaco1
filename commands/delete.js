var eco = require('discord-economy');
const Discord = require('discord.js')
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class Delete extends Command {
    constructor() {
        super({
            name: 'delete',
            aliases: ['del'],
            description: 'Deletes your tacos account',
            usage: '!delete confirm',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **delete** command`)
        mentionHook.send(webhook);
            if (client.blocks.has('blacklist', message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');
        if (args[0] === 'confirm') {
            eco.Delete(message.author.id);
            const deleted = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('I have successfully deleted your account')
            message.channel.send(deleted);
        } else {
          const not = new Discord.RichEmbed()
          .setColor('#36393E')
          .setDescription('Please do `!delete confirm` to delete your account from the database')
            message.channel.send(not)

        }
    }
    // module.exports.help = {
    //     name: 'Delete',
    //     description: 'Deletes your tacos account',
    //     usage: 'delete'
    // }
}
module.exports = Delete;
