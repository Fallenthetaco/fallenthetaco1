const headers = {
    headers: {
        'TRN-Api-Key': "5ce2d0f1-be88-4222-b79d-3645e0561462"
    }
}
const fetch = require('node-fetch');
const Discord = require("discord.js");
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class fortnite extends Command {
    constructor() {
        super({
            name: 'fortnite',
            aliases: ['fn'],
            description: 'Shows their Fortnite stats',
            usage: '!fornite <platform> <username>',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.username}#${message.author.discriminator} used the **fortnite** command`)
        mentionHook.send(webhook);
        const platform = args[0];
        const platformFail = new Discord.RichEmbed()
            .setColor('#36393E')
            .setFooter('Usage: !fortnite (platform) (user)')
            .setDescription("You must provide your platform (pc, xbl, psn)")
        if (platform !== "pc" && platform !== "psn" && platform !== "xbl") return message.channel.send(platformFail);
        const user = args.slice(1).join(' ');
        const userFail = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setFooter('Usage: !fortnite (platform) (user)')
            .setDescription('You must provide a username for me to search.')
        if (!user) return message.channel.send(userFail)
        const results = fetch(`https://api.fortnitetracker.com/v1/profile/${platform}/${user}`, headers).then(data => data.json()).then(json => {
            const data = json.lifeTimeStats
            const score = data[6].value;
            const matchesPlayed = data[7].value;
            const wins = data[8].value;
            const winP = data[9].value;
            const kills = data[10].value;
            const kd = data[11].value;

            const embed = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setAuthor(`${json.epicUserHandle}'s Fortnite Stats`)
                .addField("Wins", wins, true)
                .addField("Score", score, true)
                .addField("Matches Played", matchesPlayed, true)
                .addField("Win Percentage", winP, true)
                .addField("Kills", kills, true)
                .addField("K/D", kd, true)
                .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL)
            message.channel.send(embed);

        });
        const failed = new Discord.RichEmbed()
            .setColor('#36393E')
            .setDescription('Can not find this user in the database!!')
        if (!results) return message.channel.send(failed);
    }
    // module.exports.help = {
    // name: 'fortnite',
    // usage: 'fortnite <platform> <username>',
    // description: 'Shows their Fortnite stats'
    // }
}
module.exports = fortnite;
