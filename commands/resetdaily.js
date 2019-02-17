const eco = require('discord-economy');
const {
    Command
} = require('djs-easy-command');
const Discord = require('discord.js');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class resetDaily extends Command {
    constructor() {
        super({
            name: 'resetdaily',
            aliases: ['rd'],
            description: "Resets the daily for a user",
            usage: '!resetdaily @user',
            owner: true,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
        if (message.author.id !== process.env.ownerID) return message.channel.send('You are not the owner of this bot!!');
        const target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        eco.ResetDaily(target.id);
        message.channel.send(`I have successfully reset ${target.id}'s daily`)

    }
    // module.exports.help = {
    //     name: 'resetdaily',
    //     description: "Resets the daily for a user",
    //     usage: 'resetdaily @user'
    // }
}
module.exports = resetDaily;