const Discord = require('discord.js');
const config = require('../config.json');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

function convertMS(milliseconds) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}
class botinfo extends Command {
    constructor() {
        super({
            name: 'botinfo',
            aliases: ['bi'],
            description: 'Shows information about me',
            usage: '!botinfo',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }
    async run(client, message, args) {
        try {
            mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **botinfo** command in the server: ${message.guild.name} (${message.guild.id})`);
            const uptime = client.uptime;
            var durations = convertMS(uptime);
            let os = require('os')
            const stuff = process.memoryUsage()
            const rss = stuff.rss;
            let RamUsages = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
            let RamTotal = (os.totalmem() / 1024 / 1024).toFixed(2);
            let percentRAM = (RamUsages / RamTotal * 100).toFixed(2);
            const heapTotal = stuff.heapTotal;
            const heaapTotal = Math.floor(heapTotal / 1024 / 1024).toFixed(2);
            const heapUsed = stuff.heapUsed;
            const heaapUsed = Math.floor(heapUsed / 1024 / 1024).toFixed(2);
            const external = stuff.external;
            const external1 = Math.floor(external / 1024 / 1024).toFixed(2);
            const cpu = os.cpus()
            const model = cpu.map(x => x.model)
            const prefix = client.guildPrefixes.get(message.guild.id);
            if (!prefix) client.guildPrefixes.set(message.guild.id, '!');
            const users = client.shard.fetchClientValues('users.size')
                .then(user => {
                    const servers = client.shard.fetchClientValues('guilds.size')
                        .then(results => {

                            const embed = new Discord.RichEmbed()
                                .setColor(`#36393E`)
                                .setURL("https://discord.gg/53D2WKY")
                                .addField('Servers', `${results.reduce((prev, val) => prev + val, 0)}`, true)
                                .addField('Library', 'discord.js v11.4.2', true)
                                .addField('Total Commands', client.commands.size, true)
                                .addField('Total Members', `${user.reduce((prev, val) => prev + val, 0)}`, true)
                                .addField('Developers', '`FallenTaco#6666`\n`Brogame#4115`', true)
                                .addField('Version', 'v2.0', true)
                                .addField('CPU', model, true)
                                .addField('RAM Usage (Broken)', `${RamUsages} MB / ${RamTotal} MB`, true)
                                .addField('heapTotal:', `${heaapTotal} MB`, true)
                                .addField('Prefixes', `**!** (default) \n**${prefix}**`, true)
                                .addField('heapUsed', `${heaapUsed} MB`, true)
                                .addField('external', `${external1} MB`, true)
                                .setAuthor('Fallenthetaco', 'https://cdn.discordapp.com/avatars/436047056394649600/bf3a8fec0450f34ab8db74dee8d94175.png?size=128')
                                .setFooter(`Uptime: ${durations.day} days, ${durations.hour} hours, ${durations.minute} minutes, ${durations.seconds} seconds`);
                            message.channel.send(embed);
                        })
                })
        } catch (e) {
            const embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setFooter(`Command: botinfo ${message.guild.name}`)
                .setDescription(e);
            errorBot.send(embed);
        }
    }
    // module.exports.help = {
    //     name: 'botinfo',
    //     description: 'Shows information about me',
    //     usage: 'botinfo'
    // }
}
module.exports = botinfo;