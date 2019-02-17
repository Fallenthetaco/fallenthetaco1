const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class removewarns extends Command {
    constructor() {
        super({
            name: 'removewarns',
            aliases: ['rw'],
            description: "removes a warn from the warn list. (reason # doesnt reset)",
            usage: '!removewarns @user <number>'
        })
    }

    async run(client, message, args) {
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.member(message.author);
        if (!user) return message.channel.send('Please mention a user to remove one of their warns');
        const data = client.warnings.get(`${message.guild.id}_${user.id}`);
        const warn = client.warnings.get(`${message.guild.id}_${user.user.username}`);
        var i;
        const embed = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription('You do not have any warns for me to remove!!')
        if (!data) return message.channel.send(embed);

        const warnNum = args[1];
        if (!warnNum) return message.channel.send('Please give me a number to remove the warn');
        if (isNaN(warnNum)) return message.channel.send('**Please supply a valid number for me to remove the warn**');
        let warns = Math.floor(warn.warns - 1)
        client.warnings.set(`${message.guild.id}_${user.user.username}`, {
            warns: warns
        })
        client.warnings.delete(`${message.guild.id}_${user.id}`, data[warnNum][0]);
        message.channel.send('You have successfully removed the warn');
        console.log(client.warnings)
    }
    // module.exports.help = {
    //     name: 'removewarns',
    //     description: "removes a warn from the warn list. Also put ",
    //     usage: 'removewarn @user <number>'
    // }
}
module.exports = removewarns;