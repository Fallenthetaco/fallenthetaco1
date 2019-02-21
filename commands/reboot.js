const {
    promisify
} = require("util");
const write = promisify(require("fs").writeFile);
const Discord = require('discord.js');

const ownerID = '286713468285878272';
const { Command } = require('djs-easy-command');

class reboot extends Command {
  constructor() {
    super({
  name: 'reboot',
  aliases: ['rb'],
  description: 'Owner Command',
  usage: '!reboot'
  })
}
async run (client, message, args) {
    if (message.author.id !== ownerID) return message.channel.send('You are not the owner of this bot!!');
    const embed = new Discord.RichEmbed()
          .setColor(`#36393E`)
        .setDescription('The bot will now reboot');
    await message.channel.send(embed);
    const embedd = new Discord.RichEmbed()
        .setColor(`#36393E`)
        .setDescription('Rebooting....');
    await message.channel.send(embedd);

    // const commandUnloads = client.commands.filter(c => !!c.db).array();
    // for (const c of commandUnloads) {
    //     await c.db.close();
    // }
    process.exit(1);
};
// module.exports.help = {
//     name: 'reboot',
//     description: 'Reboots the bot',
//     usage: 'reboot'
// }
}
module.exports = reboot;