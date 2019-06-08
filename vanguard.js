const express = require('express');
var app = express();
const http = require('http');

const server = http.createServer(app);

server.listen(3000);

const eco = require('discord-economy');
const Discord = require('discord.js');
const {
    Client
} = require('discord.js');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');
const config = require("./config.json");
const ddiff = require('return-deep-diff');
const request = require("request");
const fs = require("fs")
const ownerID = '286713468285878272';
const filters = require('./functions');
const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
const moment = require('moment');
const newUsers = new Discord.Collection();
const modRole = 'Administrator';
const Enmap = require('enmap');
const cooldown = new Set();
let cdseconds = 5;
const db = require('quick.db');
var schedule = require('node-schedule');
const EnmapMongo = require('enmap-mongo');
// var cleverbot = require("cleverbot.io"),
// bot = new cleverbot("Lxy4yF4XHO4VcBem", "vrAMnpeRdG6ASVbbADKnBc1br1FQLPpU");
// bot.setNick("sessionname")
// bot.create(function (err, session) {
// }
const createHash = require('hash-generator');
const swearWords = ['gay', 'Gay', 'GAY', 'fuck', 'Fuck', 'FUck', 'FUCK', 'Fuk', 'Fuckers', 'G A E', 'gae', 'Gae', 'G A Y', 'GaY', 'GAE', 'GAy', 'gAy', 'gAY', 'lesbian', 'Lesbian', 'LESBIAN', 'LEsbian', 'LESbian', 'LESBian', 'LESBIan', 'LESBIAn', 'LESBIAN'];
const level = new EnmapMongo({
  name: 'test',
  dbName: 'enmap',
  url: 'mongodb://fallentaco:jn196196@ds235768.mlab.com:35768/fallentaco'
});

const Database = new Enmap({
    name: 'dataBase',
    fetchAll: true,
    autoFetch: true,
    cloneLevel: 'deep'
});
// function x() {
//   console.log(Enmap.fetchEverything());}
// setTimeout(x, 8000)
class Fallenthetaco extends Client {
    constructor(options) {
        super(options);
        this.db = Database;
    }
}
var client = new Fallenthetaco({
    disableEveryone: true,
    disabledEvents: ['TYPING_START', 'TYPING_STOP']
});
client.keys180 = new Enmap({
    name: 'keys180'
});
client.keys365 = new Enmap({
    name: 'keys365'
});
client.comman = new Enmap({
    name: 'command'
});
client.servers = new Enmap({
    name: 'serversPremium'
});
client.autoRole = new Enmap({
    name: 'servers'
});
client.channel = new Enmap({
    name: 'serverChannels'
});
client.players = new Enmap({
    name: 'database'
});
client.message = new Enmap({
    name: 'serverMessage'
});
client.job = new Enmap({
    name: 'jobsList'
});
client.items = new Enmap({
    name: 'items'
});
client.powerups = new Enmap({
    name: 'powerups'
});
client.uptimes = new Enmap({
    name: 'uptimes'
});
client.blocks = new Enmap({
    name: "blockedPlayers"
});
client.activatePower = new Enmap({
    name: 'playersActivate'
});
client.modLogs = new Enmap({
    name: 'logs'
});
client.activities = new Enmap({
    name: 'activity'
});
client.command = new Enmap({
    name: 'commands'
});
client.jobs = new Enmap({
    name: 'jobs'
});
client.permissions = new Enmap({
    name: 'permission'
});
client.fortnite = new Enmap({
    name: 'fortniteUsers'
});
client.minecraft = new Enmap({
    name: 'minecraft'
});
client.minecraftcmds = new Enmap({
    name: 'minecraftCmds'
});

var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/Fallenthetaco.ico'));
app.set('view engine', 'ejs')
app.get('/', function(req, res) {
    res.render(__dirname + '/home.ejs', {
        client: client
    })
});
setInterval(() => {
  http.get(`http://fallenthetaco.glitch.me/`);
}, 280000);

app.get('/support', function(req, res) {
    res.sendFile(__dirname + '/support.html')
});
app.use(express.static(__dirname + '/public'));
app.get('/donate', function(req, res) {
    res.sendFile(__dirname + '/donate.html')
});
app.get('/upvote', function(req, res) {
    res.sendFile(__dirname + '/upvote.html')
});
app.get('/addme', function(req, res) {
    res.sendFile(__dirname + '/addme.html')
});
app.get('/commands', function(req, res) {
    res.render(__dirname + '/commands.ejs', {
        client: client
    })
});

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
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason.stack);
});

const upvoted = new Discord.WebhookClient('460934572230705172', 'nF5S4tbUZsf6lUP6iuEIPftginCgnuKp1hZ3V5w5QfIepCE-KNKbJVzqG8PTRncdKbhA')
const DBL = require('dblapi.js');
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNjA0NzA1NjM5NDY0OTYwMCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ2MjM1MzUwfQ.NpErjoDENQNl82HZmvFAIJM3rzQ_MvX0xyaj3FCtjiA', {
    webhookServer: server,
    webhookAuth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNjA0NzA1NjM5NDY0OTYwMCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTI3ODg3MDY3fQ.3JuTYp-rb2-kXEaB6-RCTahjofJ1kZvpjT1BrjeGy50'
}, client);
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
// process.on("unhandledRejection", error => {
//     console.error("Unhandled promise rejection:", error);
// });
dbl.webhook.on('vote', async (vote) => {
    if (vote.isWeekend === true) {
        client.blocks.ensure('blacklist', []);
        const people = client.blocks.get('blacklist');
        if (people.includes(vote.user)) return;
        // const amount = Math.floor(Math.random() * 2001) + 1000;
        // const amount = Math.floor(Math.random() * 2001) + 2000;
        const amount = Math.floor(Math.random() * 2001) + 4000
        eco.AddToBalance(vote.user, amount);
        upvoted.send(`The user with the ID: ${vote.user} has voted. I gave him $${amount}`);
        client.fetchUser(vote.user).then(user => {
            user.send(`Remember to upvote every 12 hours, and I have gave you $${amount}. Enjoy!!`);
        });
        console.log(`The user with the ID: ${vote.user} has voted`);
    } else {
        client.blocks.ensure('blacklist', []);
        const people = client.blocks.get('blacklist');
        if (people.includes(vote.user)) return;
        // const amount = Math.floor(Math.random() * 1001) + 500;
        // const amount = Math.floor(Math.random() * 1001) + 1000;
        const amount = Math.floor(Math.random() * 1001) + 2000
        eco.AddToBalance(vote.user, amount);
        upvoted.send(`The user with the ID: ${vote.user} has voted. I gave him $${amount}`);
        client.fetchUser(vote.user).then(user => {
            user.send(`Remember to upvote every 12 hours, and I have gave you $${amount}. Enjoy!!`);
        });
        console.log(`The user with the ID: ${vote.user} has voted`);
    }
    // vote.send(`You have successfully received $${amount} for upvoting me. Please upvote again in 12 hours`)
});
dbl.on('posted', () => {
    console.log('Server count posted!');
});

dbl.on('error', e => {
    console.log(`Oops! ${e}`);
});

client.warnings = new Enmap({
    name: 'warnings'
});
var logStream = fs.createWriteStream('errors.txt', {
    flags: 'a'
});
const defaultSettings = {
    prefix: "!"
}

function LogToFile(text) {
    logStream.write(text + "\n");
}

let subbedChannels = JSON.parse(fs.readFileSync("./channels.json", "utf8"));

function SaveChannelFile() {
    fs.writeFile("./channels.json", JSON.stringify(subbedChannels), (err) => {
        if (err) console.log(err)
    });
}

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};
process.on('exit', (code) => {
    const uptime = client.uptime;
    var durations = convertMS(uptime);
    console.log(`About to exit with code: ${code}`);
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var months = month + 1;
    var year = d.getFullYear();
    client.uptimes.set(`${months}/${day}/${year}`, `${durations.hour} hours, ${durations.minute} minutes, ${durations.seconds} seconds`);
    client.uptimes.close();
});


// New command handler
const {
    Handler
} = require('djs-easy-command');
// const ch = new Handler(client, {
//     directory: `${__dirname}/minecraft/`,
//     prefixes: ['!mi', '<@436047056394649600>'],
//     owners: ['286713468285878272']
// });

const CH = new Handler(client, {
    directory: `${__dirname}/commands/`,
    prefixes: ['!', '<@436047056394649600>'],
    owners: ['286713468285878272'],
    disabled: []
});

function commandLoop() {
    client.comman.set('command', [])
    for (var value of client.commands.values()) {
        client.comman.push('command', {
            name: value.name,
            description: value.description,
            usage: value.usage,
            alias: value.aliases,
            category: value.category
        });
    }
}
setTimeout(commandLoop, 8000)

const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
const uri = "mongodb+srv://Fallentaco:jn196196@discordbot-3t7gk.mongodb.net/test?retryWrites=true";
MongoClient.connect(uri, function(err, dab) {
  if (err) throw err;
  console.log("Database connected!");
  var dbo = dab.db("mydb");
  if (!dbo.collection('commands')) {
  dbo.createCollection('commands', function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
  }
  const commands = client.comman.get('command');
  // commands.forEach(function(x) {
  //   if (dbo.collection('commands').find(x).limit(1));
  //   dbo.collection("commands").insertOne(x, function(err, res) {
  //   if (err) throw err;
  //   console.log(`${x.name}'s document created!`);
  //   });
  // });
  const items = client.items;
  if (dbo.collection('items').find(items)) return;
  dbo.collection('items').insertOne(items, function(err, deb) {
  if (err) throw err;
    console.log('Collection Created');
  dab.close();
  });
  });
  // const obj = {
  //   name: commands,
  //   usage: usage,
  //   description: description,
  //   alias: `!${alias}`,
  //   category: category
  // }
  

// Old command handler
// fs.readdir("./commands/", (err, files) => {
//     if (err) return console.error(err);
//     files.forEach(file => {
//         if (!file.endsWith(".js")) return;
//         // Load the command file itself
//         let props = require(`./commands/${file}`);
//         // Get just the command name from the file name
//         let commandName = file.split(".")[0];
//         console.log(`Attempting to load command ${commandName}.js`);
//         // Here we simply store the whole thing in the command Enmap. We're not running it right now.
//         client.commands.set(commandName, props);
//     });
// });
const handleGuildMemberAdd = async (member) => {
    const channelid = client.channel.get(member.guild.id);
    if (channelid) {
      const serverCheck = client.autoRole.get(member.guild.id);
      const messages = client.message.get(member.guild.id);
      if (!messages) return;

      const messagee = messages.replace(/{guildname}/g, member.guild.name).replace(/{tag}/g, `${member.user}`);
      if (channelid) {
        client.channels.get(channelid).send(messagee);
        member.addRole(serverCheck);
      }
    const memberCount = member.guild.channels.find((channel) => channel.name.startsWith(`Member Count:`));
    if (!memberCount) return;
    const botCount = member.guild.channels.find((channel) => channel.name.startsWith(`Bot Count:`));
    memberCount.edit({name: `Member Count: ${member.guild.members.filter(members => !members.user.bot).size}`});
    botCount.edit({name: `Bot Count: ${member.guild.members.filter(members => members.user.bot).size}`});
    } else {
    const memberCount = member.guild.channels.find((channel) => channel.name.startsWith(`Member Count:`));
    if (!memberCount) return;
    const botCount = member.guild.channels.find((channel) => channel.name.startsWith(`Bot Count:`));
    memberCount.edit({name: `Member Count: ${member.guild.members.filter(members => !members.user.bot).size}`});
    botCount.edit({name: `Bot Count: ${member.guild.members.filter(members => members.user.bot).size}`});
}
}
const handleGuildMemberRemove = async (member) => {
  const memberCount = member.guild.channels.find((channel) => channel.name.startsWith(`Member Count:`));
  if (!memberCount) return;
  const botCount = member.guild.channels.find((channel) => channel.name.startsWith(`Bot Count:`));
  if (!botCount) return;
  memberCount.edit({name: `Member Count: ${member.guild.members.filter(members => !members.user.bot).size}`});
  botCount.edit({name: `Bot Count: ${member.guild.members.filter(members => members.user.bot).size}`});

}

const handleGuildCreate = async (guild) => {
    client.guildPrefixes.set(guild.id, '!');
    const embed = new Discord.RichEmbed()
    .setColor('#36393E')
    .setDescription(`I have been added to the server: **${guild.name}** (${guild.id}), Owned by: **${guild.owner.user.tag}**, with ${guild.members.filter(member => !member.user.bot).size} members and ${guild.members.filter(member => member.user.bot).size} bots at ${new Date()}`)
    mentionHook.send(embed);
    console.log(`I have been added to the server: ${guild.name}, Owned by: ${guild.owner.user.tag}, with ${guild.members.filter(member => !member.user.bot).size} members`);
    const role = guild.roles.find(x => x.name === client.user.username);
    if (!role) return;
    role.setColor('#36393E')
};
const handleGuildDelete = (guild) => {
  const embed = new Discord.RichEmbed()
  .setColor('#36393E')
  .setDescription(`I have left the server **${guild.name}** (${guild.id}) at **${new Date()}**`)
    mentionHook.send(embed);
    console.log(`I have left ${guild.name} at ${new Date()}`);
    // client.db.delete(guild.id);
};
const handleGuildMemberUpdate = async (oMember, nMember) => {
  if (oMember.nickname === null) return;
  const check = client.modLogs.get(oMember.guild.id);
  if (!check) return;
  const embed = new Discord.RichEmbed()
    .setColor('#36393E')
    .setDescription();
  client.channels.get(check).send(embed)
  
  // console.log(oMember.nickname);
  // console.log(nMember.nickname);
};


const func = require('./function.js');

const handleMessage = async (message) => {

    if (message.author.bot) return;
    if (message.channel.type !== 'text') {
    const author = message.author;
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`If you want to start a new ticket, please [Click Here](https://discord.gg/53D2WKY) and do \`!new\``)
      author.send(embed);
    }
        if (message.channel.type === "dm") return;
    const prefix = client.guildPrefixes.get(message.guild.id);
    if (!prefix) client.guildPrefixes.set(message.guild.id, '!');

    // let prefix = guildConf.prefix;
    if (message.guild.id === '533710781674422282') {
        if (swearWords.some(word => message.content.includes(word))) {
            message.delete();
            message.reply('Please do not say a bad word again.')
        }
    }
    if (message.guild.id === '446775078240387093') {
        if (swearWords.some(word => message.content.includes(word))) {
            message.delete();
        }
    }
    if (message.guild.id === '529384883232178202') {
        if (swearWords.some(word => message.content.includes(word))) {
            message.delete();
            message.reply('Please do not say a bad word again.')
        }
    }
    //529384883232178202
    var usaTime = new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles"
    });
    let times = new Date(usaTime).getHours();

    function removeMapElementsByValue(times, value, key, map) {
        // console.log(`[${key}] = ${value}`);
        if (value === times) {
            map.delete(key)
        }
    }
  if (message.guild.id === '446775078240387093') {
    if (message.content.includes("https://")) {
      message.delete(1);
      message.channel.send("No links here, " + message.author);
    }
    if (message.content.includes("http://")) {
      message.delete(1);
      message.channel.send("No links here, " + message.author);
    }
    if (message.content.includes('discord.gg')) {
      message.delete(1);
      message.channel.send('No links here, ' + message.author);
    }
  }
    client.activatePower.forEach(removeMapElementsByValue.bind(null, times));
    if (message.content === '<@436047056394649600>') {
        
      const data = client.guildPrefixes.get(message.guild.id);
            if (!data[0]) return message.channel.send('The prefix is **!**');
            if (data[0] === "!") return message.channel.send('The prefix is **!**')
            if (data[0]) return message.channel.send(`The prefix is **${data[0]}** or **!** (default)`);
        }
    if (!message.content.startsWith('!')) return;
    const args = message.content.split(/ +/g);

    if (message.content.startsWith('!0000')) {
        if (message.author.id !== ownerID) return message.channel.send('You are not the owner of this bot!!');
        const answer = args[1].join(' ');
        client.users.get('328028716854804482').send(answer);
        message.channel.send('You have successfully dm the person');
    }
    let done = client.servers.get(message.guild.id);

    if (done) {
        if (Date.now() === done) return client.servers.delete(message.guild.id);
    }


    // let messageArray = message.content.split(' ');
    //   let command = messageArray[0];
    //   let cmd = CH.getCommand(command.slice(0));
    //     if (command.startsWith(command)) {
    //         if (cmd) {
    //             try {
    //                 cmd.run(client, message, args, guildConf, mentionHook, errorBot, func);
    //                 if (!message.member.hasPermission('ADMINISTRATOR')) {
    //                     cooldown.add(message.author.id);
    //                 }
    //             } catch (e) {
    //                 console.log(e)
    //             }
    //         }
    // const commands = args.shift().toLowerCase();
    // let commandfile = client.commands.get(command.slice(prefix.length));
    //     if (commandfile) {
    // if (!message.member.hasPermission('ADMINISTRATOR')) {
    //     cooldown.add(message.author.id);
    // }
    //         commandfile.run(client, message, args, guildConf, mentionHook, errorBot, func);
    //     }

    const argresult = args.slice(1).join(' ');
    if (message.content.startsWith('!channel')) {
        console.log(message.channel.id)
    }
    if (message.content.startsWith('!update')) {
      if (message.author.id !== ownerID) return;
      let act = args.slice(1).join(' ');
      if (!act) return message.channel.send('You must provide something for the activity on the website');
      client.activities.set('activity', act);
      message.channel.send('I have successfully changed the activity, go check out the website to see the changes.');
      const embed = new Discord.RichEmbed()
      .setColor('#36393E')
      .setDescription(act)
      .setAuthor('Updates:')
      .setFooter(`- ${message.author.tag}`)
      client.channels.get('452003111628832798').send(embed);
    }
    if (message.content.startsWith('!block')) {
        if (message.author.id !== ownerID) return;
        client.blocks.ensure('blacklist', []);
        let person = message.guild.members.get(args[1]).id;
        if (!person) return message.channel.send(`You must provide a id of the person you want to the blacklist.`)
        if (!isNaN(person)) {
        let person = message.guild.members.get(args[1]).id;
        if (!person) return message.channel.send('You must provide a real id of the person you want to blacklist.')
        }
        let check = client.blocks.get('blacklist')
        if (check.includes(person)) return message.channel.send('This person is already blacklisted.')
        client.blocks.push('blacklist', person);
        message.channel.send(`I have successfully blacklisted: **${person}** from using economy.`)
    }
    if (message.content.startsWith('!check')) {
      MongoClient.connect(uri, function(err, dab) {
        if (err) throw err;
        console.log("Database connected!");
        var dbo = dab.db("mydb");
        dbo.collection('items').find({}, function(err, doc) {
          console.log(doc);
        const hey = doc[message.author.id];
        console.log(hey)
        });
          if (err) throw err;
        dab.close();
      });
    }
    if (message.content.startsWith('!unblock')) {
        if (message.author.id !== ownerID) return;
        client.blocks.ensure('blacklist', []);
        let person = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]);
        if (!person) return message.channel.send('You must provide the id of the person you want to remove from the blacklist.');
        person = person.id;
        if (!isNaN(args[1])) {
        let person = message.guild.members.get(args[1]).id;
        if (!person) return message.channel.send('You must provide a real id of the person you want to remove from the blacklist.')
        }
        let check = client.blocks.get('blacklist')
        if (!check.includes(person)) return message.channel.send('This person has not been blacklisted yet.')
        client.blocks.remove('blacklist', person);
        message.channel.send(`I have successfully unblacklist **${person}** from using economy.`)
    }
    if (message.content.startsWith('!setstatus')) {
        if (message.author.id !== ownerID) return message.channel.send('You are not the owner of this bot!!');
        if (!argresult) argresult = 'online';
        client.user.setStatus(argresult);
        message.channel.send('You have successfully changed my status');
        console.log('setstatus: ' + argresult);
    }
    if (message.content.startsWith('!setgame')) {

        if (message.author.id !== ownerID) return message.channel.send('You are not the owner of this bot!!');
        if (!argresult) return argresult = null;
        client.user.setActivity(argresult, {
            type: "WATCHING"
        });
        message.channel.send('You have successfully changed my game')
        console.log('setgame: ' + argresult);
    }
    if (message.content.startsWith('!generate')) {
        if (message.author.id !== ownerID) return message.channel.send('You are not the owner of this bot!!');
        client.keys365.ensure('keys365', []);
        client.keys180.ensure('keys180', []);
        const gen = args[1];
        if (!gen) return message.channel.send('Is it 365 or 180 days?')
        if (gen === '365') {
            var hash = createHash(16);
            client.keys365.push('keys365', `${hash}`)
            const embed = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription(hash)
            message.author.send(embed);
        } else if (gen === '180') {
            var hash = createHash(16);
            client.keys180.push('keys180', `${hash}`)
            const embed = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription(hash)
            message.author.send(embed);
        } else return message.channel.send('Is it 365 or 180 days?');
    }
    var parts = message.content.split(' ');
    if (message.content.startsWith('!rules')) {
        if (message.channel.id !== '447902203181531136') return;
        await message.delete();
        const embed = new Discord.RichEmbed()
            .setColor('#36393E')
            .setAuthor(`FallenTheTaco's Rules`)
            .addField('1.', 'Do not ping <@285077327074033676> or <@286713468285878272> without any reason what so ever')
            .addBlankField(true)
            .addField('2.', 'Remember to respect everyone, no bullies')
            .addBlankField(true)
            .addField('3.', 'If you have any suggestions, please use the `!suggest` command`')
            .addBlankField(true)
            .addField('4.', 'If you have any questions, feel free to ask in <#447902028010881044>')
            .addBlankField(true)
            .addField('5.', `If you have any problems, please ask the staff about your concern and we'll help ya out`)
            .addBlankField(true)
            .addField('6.', 'You can not use commands in <#447902028010881044>, and <#530926356767309834> ')
            .addBlankField(true)
            .addField('7.', `No advertising, otherwise it'll be a 1 day mute. If repeated/spam, banned from the server (This applies to DM advertisements too)`)
            .addBlankField(true)
            .addField('8.', 'No casual conversations in the <#447902028010881044>, and <#530926356767309834> channels')
            .addBlankField(true)
            .addField('9.', 'Keep the chat in English')
            .addBlankField(true)
            .addField('10.', 'Follow the Discord TOS')
            .addBlankField(true)
            .addField('11.', 'Never joke around Suicide __**AT ALL**__')
            .addBlankField(true)
            .addField('12.', 'Please do not abuse the Support Ticket system (by dming <@436047056394649600>). Otherwise its a ban from using the system.')
            .addBlankField(true)
            .addField('13.', 'Last but not least, No NSFW content on __**ANY**__ channels, otherwise its a 12h mute.')
            .setFooter('If you like to use my bot, Please upvote it by doing !upvote')
        message.channel.send(embed);
    }
    if (message.content.startsWith('!quotes')) {
        if (message.guild.id !== '469751687909998593') return;
        await message.delete();
        let got = args.slice(1).join(' ');
        if (!got) return message.channel.send('You need to provide a quote that you want to quote on.');
        let url = `https://purrbot.site/api/quote?text=${got}&name=${message.author.username}&avatar=${message.author.avatarURL}`
        let done = url.replace(/ /g, '%20');
        const embed = new Discord.RichEmbed()
            .setColor('#36393E')
            .setImage(done)
        message.channel.send(embed);
    }
    if (message.content.startsWith('!serverlist')) {
        if (message.author.id !== '286713468285878272') return;
        let listFile = client.guilds.sort((a, b) => {
            return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
        }).map(v => {
            let channelList = v.channels.filter(gc => subbedChannels.map(ch => ch.channel).includes(gc.id));
            return v.name + "\n" + channelList.map(gc => "-" + gc.name).join("\n");
        }).join("\n");
        let fileBuffer = Buffer.from(listFile, 'utf8');
        let attach = new Discord.Attachment(fileBuffer, 'list.txt');
        message.channel.send(attach);
        return;
    }
  
}
// const shards = Manager.shards;
// console.log(shards);
const handleReady = (message) => {
    function statuses() {
        const users = client.shard.fetchClientValues('users.size')
            .then(user => {
                const servers = client.shard.fetchClientValues('guilds.size')
                    .then(results => {
                        let status = [`${results.reduce((prev, val) => prev + val, 0)} guilds`, `${user.reduce((prev, val) => prev + val, 0)} users`, 'Mention me for prefix'];
                        setInterval(function() {
                            let statuss = status[Math.floor(Math.random() * status.length)];
                            client.user.setActivity(statuss, {
                                type: "WATCHING"
                            });
                        }, 10000);
                        setInterval(() => {
                            dbl.postStats(`${results.reduce((prev, val) => prev + val, 0)}`);
                        }, 1800000);
                    })
            })
    }
    setTimeout(statuses, 70000);

    client.user.setStatus('dnd');

    console.log('I am ready!');

    console.log(`Im in ${client.guilds.size} servers!!`);
    var snekfetch = require("snekfetch");

    //You have to replace 'xxx' with your token
    const users = client.shard.fetchClientValues('users.size')
        .then(user => {
            const servers = client.shard.fetchClientValues('guilds.size')
                .then(results => {
                    const blapi = require('blapi')
                    blapi.handle(client, {
                        'discordsbestbots.xyz': 'a9969a8272683529ac6397b6f94e4bc9d9ceb5ba'
                    }, 30) // 30 mins
                    // const blapi = require('blapi')
                    // blapi.handle(client, {
                    // 'discordbotindex.com': 'TOKEN HERE',
                    // }, 30) // every 30 minutes will refresh
                    // });
                    const BOATS = require("boats.js");
                    const boats = new BOATS('tVMlfcGsUM4Rqj8f52Lmj7YC1uixQiJmLDwdmixrVDP6R5vNz8bbd61BSUw2ydrwJKUlz1Tf0U8MWVcVst7XD1qd8C2LVKxUO0JlN8MT3II4MxK7FO726VDu8mb939PKv7EuHir5tQ0Xf7UBrD0wdtFrM7D');
                    boats.postStats(results.reduce((prev, val) => prev + val, 0), '436047056394649600');
                    snekfetch.post('https://divinediscordbots.com/bots/436047056394649600/stats', {
                            headers: {
                                Authorization: 'f1818d88d44bc006b76674b4d675d839f1ae07cc2c19fb807ad7fcd49321d1f6db622a97753566afad24b6d6007b7fca8acf4411c0ffa2a20138fe478cb02c8a'
                            }
                        })
                        .send({
                            server_count: results.reduce((prev, val) => prev + val, 0),
                            user_count: user.reduce((prev, val) => prev + val, 0)
                        })
                        .catch(r => console.log('[divinediscordbots.com] Failed POST'));

                    snekfetch.post('https://bots.ondiscord.xyz/bot-api/bots/436047056394649600/guilds', {
                            headers: {
                                Authorization: 'c2ef9d183d47c95020a37e71631407a5'
                            }
                        })
                        .send({
                            server_count: results.reduce((prev, val) => prev + val, 0),
                        })
                        .catch(r => console.log('[bots.ondiscord.xyz] Failed POST'));

                    snekfetch.post('https://ls.terminal.ink/api/v2/bots/436047056394649600', {
                            headers: {
                                Authorization: 'e30173d50c141475313da69116e9dba413c020d9'
                            }
                        })
                        .send({
                            server_count: results.reduce((prev, val) => prev + val, 0),
                        })
                        .catch(r => console.log('[ls.terminal.ink] Failed POST'));

                    snekfetch.post('https://botsfordiscord.com/api/bot/436047056394649600', {
                            headers: {
                                Authorization: 'ef9f382a90aa5c142c6d001c47072bf4c419c61864e734f5a418b1d8854be34573cd67052cde8007863bb6e89e4fd92ec051856bb5dbd654077762231dc53ac6'
                            }
                        })
                        .send({
                            server_count: results.reduce((prev, val) => prev + val, 0),
                        })
                        .catch(r => console.log('[botsfordiscord.com] Failed POST'));

                    snekfetch.post('https://botlist.space/api/bots/436047056394649600', {
                            headers: {
                                Authorization: 'b2be138f96628f77397fc889896b60323a2886205029318b18d68b727b8ef398'
                            }
                        })
                        .send({
                            server_count: results.reduce((prev, val) => prev + val, 0),
                        })
                        .catch(r => console.log('[botlist.space] Failed POST'));

                    snekfetch.post('https://discordbot.world/api/bot/436047056394649600/stats', {
                            headers: {
                                Authorization: '8d9a0ddfd28af0dc670e69ae76ccf98abe15753b734e54b1b3f4b2d3f9c97386d2678ae3c3049a671db813130d3cd273'
                            }
                        })
                        .send({
                            guild_count: results.reduce((prev, val) => prev + val, 0),
                        })
                        .catch(r => console.log('[discordbot.world] Failed POST'));

                    snekfetch.post('https://discordbotreviews.xyz/api/bot/436047056394649600/stats', {
                            headers: {
                                Authorization: '48DrQycZDaxDmNsBOfiC0kaBPJuKe05bBlkgQmoK-4pklxqkYX4oK0M8RmqrcsHlMITbRJj.g9VQoRnl'
                            }
                        })
                        .send({
                            server_count: results.reduce((prev, val) => prev + val, 0),
                        })
                        .catch(r => console.log('[discordbotreviews.xyz] Failed POST'));

                    snekfetch.post('https://discordbots.group/api/bot/436047056394649600', {
                            headers: {
                                Content_Type: 'application/json',
                                Authorization: '037370d71f65d0be4881ce7921fce33bd752611d51695e8a29'
                            }
                        })
                        .send({
                            server_count: results.reduce((prev, val) => prev + val, 0),
                        })
                        .catch(r => console.log('[discordbots.group] Failed POST'));
                })
        })
};
//https://botlist.space/api/bots/
client.on('message', handleMessage);
client.on('guildCreate', handleGuildCreate);
client.on('guildDelete', handleGuildDelete)
client.on('guildMemberAdd', handleGuildMemberAdd);
client.on('guildMemberRemove', handleGuildMemberRemove);
client.on('ready', handleReady);
client.on('guildMemberUpdate', handleGuildMemberUpdate);
client.on('error', console.error);

client.login('NDM2MDQ3MDU2Mzk0NjQ5NjAw.DzreTA.l9nN1bLbkJE2JZs9dwiHQGEvmBA');
