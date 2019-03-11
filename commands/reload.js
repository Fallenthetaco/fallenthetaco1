const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class reload extends Command {
    constructor() {
        super({
            name: 'reload',
            aliases: ['rl'],
            category: 'owner',
            description: 'Owner Command',
            usage: '!reload',
            owner: true,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
        if (message.author.id !== '286713468285878272') return message.channel.send('You are not the owner of this bot!!');
        const commandName = args[0];
        if (!commandName || commandName.size < 0) return message.reply("Must provide a command name to reload!!");
        // Check if the command exists and is valid
        if (!client.commands.has(commandName)) {
            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription("That command does not exist");
            return message.channel.send(embed);
        }
        // the path is relative to the *current folder*, so just ./filename.js
        delete require.cache[require.resolve(`./${commandName}.js`)];
        // We also need to delete and reload the command from the client.commands Enmap
        client.commands.delete(commandName);
        const props = require(`./${commandName}.js`);
        console.log(props);
        client.commands.set(commandName, props);
        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription(`The command ${commandName} has been reloaded!!`)
        message.channel.send(embed);

    };
    // module.exports.help = {
    // name: 'reload',
    // description: 'reloads a command',
    // usage: 'reload (command)'
    // }
}
module.exports = reload;
