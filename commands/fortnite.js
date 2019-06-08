const headers = {
    headers: {
        'TRN-Api-Key': "394d9014-2e4e-4da1-9601-670c1d89b9c0"
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
            category: 'fun',
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
        if (args[0] === 'link') {
            const linked = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription(`You have already linked your account. In order to unlink you have to do **${client.guildPrefixes.get(message.guild.id)}fortnite unlink**`)
            if (client.fortnite.get(message.author.id)) return message.channel.send(linked);
            const platforms = args[1];
            const embed = new Discord.RichEmbed()
                .setColor('#36393E')
                .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}fortnite link (platform) (user)`)
                .setDescription("You must provide your platform (pc, xbl, psn)")
            if (platforms !== "pc" && platforms !== "psn" && platforms !== "xbl") return message.channel.send(embed);
            const player = args.slice(2).join(' ');
            const noPlayer = new Discord.RichEmbed()
                .setColor('#36393E')
                .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}fortnite link (platform) (user)`)
                .setDescription('You must provide the username for me to link')
            if (!player) return message.channel.send(noPlayer);
            let results;
            fetch(`https://api.fortnitetracker.com/v1/profile/${platforms}/${player}`, headers).then(data => {
                results = data.json();
            }).catch(err => console.log(err.stack));
            client.fortnite.set(message.author.id, {
                username: player,
                platform: platforms
            });
            const success = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('I have successfully linked your account with this player.')
            return message.channel.send(success)
        }
        if (args[0] === 'unlink') {
            const embed = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You have already unlinked your username with your account')
            if (!client.fortnite.get(message.author.id)) return message.channel.send(embed);
            client.fortnite.delete(message.author.id);
            const done = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('I have successfully unlinked your account with the player.')
            return message.channel.send(done);
        }
        const saved = client.fortnite.get(message.author.id);
        if (saved) {
            const user = saved.username
            const platform = saved.platform;
            const results = fetch(`https://api.fortnitetracker.com/v1/profile/${platform}/${user}`, headers).then(data => data.json()).then(json => {
                const data = json.lifeTimeStats
                const score = data[6].value;
                const matchesPlayeds = data[7].value;
                const matchesPlayed = Number(matchesPlayeds).toLocaleString();
                const winss = data[8].value;
                const wins = Number(winss).toLocaleString()
                const winP = data[9].value;
                const killss = data[10].value;
                const kills = Number(killss).toLocaleString()
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
        } else {
            const platforms = args[0];
            const embeed = new Discord.RichEmbed()
                .setColor('#36393E')
                .setFooter(`Usage: ${client.guildPrefixes.get(message.guild.id)}fortnite link (platform) (user)`)
                .setDescription("You must provide your platform (pc, xbl, psn)")
            if (platforms !== "pc" && platforms !== "psn" && platforms !== "xbl") return message.channel.send(embeed);
            const user = args.slice(1).join(' ');
            const results = fetch(`https://api.fortnitetracker.com/v1/profile/${platforms}/${user}`, headers).then(data => data.json()).then(json => {
                const data = json.lifeTimeStats
                const score = data[6].value;
                const matchesPlayeds = data[7].value;
                const matchesPlayed = Number(matchesPlayeds).toLocaleString();
                const winss = data[8].value;
                const wins = Number(winss).toLocaleString()
                const winP = data[9].value;
                const killss = data[10].value;
                const kills = Number(killss).toLocaleString()
                const kd = data[11].value;

                const embedd = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setAuthor(`${json.epicUserHandle}'s Fortnite Stats`)
                    .addField("Wins", wins, true)
                    .addField("Score", score, true)
                    .addField("Matches Played", matchesPlayed, true)
                    .addField("Win Percentage", winP, true)
                    .addField("Kills", kills, true)
                    .addField("K/D", kd, true)
                    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL)
                message.channel.send(embedd);
            })
        }
    }
    // module.exports.help = {
    // name: 'fortnite',
    // usage: 'fortnite <platform> <username>',
    // description: 'Shows their Fortnite stats'
    // }
}
module.exports = fortnite;