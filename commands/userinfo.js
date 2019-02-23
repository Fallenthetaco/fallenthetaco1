const Discord = require("discord.js");
const moment = require("moment");
const client = new Discord.Client();
require("moment-duration-format");
const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};
const randomColor = "#000000".replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
});

const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class userinfo extends Command {
    constructor() {
        super({
            name: 'userinfo',
            aliases: ['ui'],
            description: "Gets userinfo from a mention",
            usage: '!userinfo @user'
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **userinfo** command`)
        mentionHook.send(webhook);
        let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.member(message.author);
        if (!member) return message.channel.send("Please provide a vaild Mention");
        let bot;
        if (member.user.bot === true) {
            bot = "Yes";
        } else {
            bot = "No";
        }
        let creationDate = member.user.createdAt;
        let joinDate = member.joinedAt;
        const roles = member.roles.filter(r => r.name !== "@everyone").map(r => `<@&${r.id}>`).join(', ');
        const embeddddddddddddddddddddddddddddddddddddddddd = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setThumbnail(`${member.user.avatarURL}`)
            .setFooter(`Requested by: ${message.author.tag} (${message.author.id})`)
            .setTimestamp()
            .setAuthor(`${member.user.username}#${member.user.discriminator} (${member.id})`, member.user.displayAvatarURL)
            .addField("Bot?", `${bot}`, true)
            .addField("Status", `${status[member.user.presence.status]}`, true)
            .addField("Playing", `${member.presence.game ? `${member.presence.game.name}` : "none"}`, true)
            .addField("Creation Date", member.user.createdAt, true)
            .addField("Join Date", member.joinedAt, true)
            .addField('Your Roles', roles);

        message.channel.send(embeddddddddddddddddddddddddddddddddddddddddd);
    };
}
// module.exports.help = {
//     name: "userinfo",
//     description: "Gets userinfo from a mention or id",
//     usage: "userinfo <mention> or <id>"
// };
module.exports = userinfo;
