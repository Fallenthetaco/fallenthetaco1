const {
    Command
} = require('djs-easy-command');
const Discord = require('discord.js');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class items extends Command {
    constructor() {
        super({
            name: 'items',
            aliases: ['i'],
            description: 'Shows the items you got from work',
            usage: '!items',
            category: 'economy',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.tag} used the **items** command`)
        mentionHook.send(webhook);
      client.blocks.ensure('blacklist', []);
      let people = client.blocks.get('blacklist');
      if (people.includes(message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');
      let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.member(message.author);
        client.items.ensure(member.id, {
            tacos: 0,
            plastics: 0,
            burritos: 0,
            nachos: 0,
            rusty_cans: 0,
            quesadillas: 0
        });
        client.powerups.ensure(member.id, {
            srirachas: 0,
            jalapenos: 0,
            salsas: 0
        });
        const powerups = client.powerups.get(member.id);
        const items = client.items.get(member.id);
        const embed = new Discord.RichEmbed()
            .setColor('#36393E')
            .setAuthor(`${member.user.tag}'s items`, member.user.displayAvatarURL)
            .setFooter(`Requested by: ${message.author.tag}`)
            .addField('Tacos:', items.tacos, true)
            .addField('Plastics:', items.plastics, true)
            .addField('Burritos:', items.burritos, true)
            .addField('Nachos:', items.nachos, true)
            .addField('Rusty Cans:', items.rusty_cans, true)
            .addField('Quesadillas:', items.quesadillas, true)
            .addBlankField(true)
            .addField('Powerups:', 'Items:')
            .addField('Salsas:', powerups.salsas, true)
            .addField('Jalapenos:', powerups.jalapenos, true)
            .addField('Srirachas:', powerups.srirachas, true)
        message.channel.send(embed)
    }
}
module.exports = items;
