const {
    Client,
    Util
} = require('discord.js');
const Discord = require('discord.js')
const YouTube = module.require("simple-youtube-api");
const ytdl = module.require("ytdl-core");
const search = require('yt-search');
const config = require('../config.json');
const queue = new Map();
const youtube = new YouTube('AIzaSyDIc5xF7lWIpahYOKlIoij05vtP0FruwTc');
const ownerID = '286713468285878272';
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class music extends Command {
    constructor() {
        super({
            name: 'music1',
            aliases: ['m1'],
            cateogry: 'music',
            description: 'No longer in service',
            usage: '!music <options>',
            owner: true,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
        if (message.author.id !== ownerID) return message.channel.send('This command is not available. Please use `!music` instead.');
        const use = args[0];
        const use2 = args[1];
        const searchString = args.slice(2).join(' ');
        const url = use2 ? use2.replace(/<(.+)>/g, '$1') : '';
        const serverQueue = queue.get(message.guild.id);
        const prefix = client.guildPrefixes.get(message.guild.id);
        if (!prefix) client.guildPrefixes.set(message.guild.id, '!');
        if (use === 'play') {
        let users = client.users.set('music', [])
            users.push('music', message.author.id);
            mentionHook.send(`${message.member.user.tag} used the **play** command in the server: ${message.guild.name} (${message.guild.id})`);
            const argsFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('Please provide a link or text.');
            if (!use2) return message.channel.send(argsFail);
            const voiceChannel = message.member.voiceChannel;
            const vcFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('I\'m sorry but you need to be in a voice channel to play music!')
            if (!voiceChannel) return message.channel.send(vcFail);
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) {
                const connectFail = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription('I cannot connect to your voice channel, please make sure I have the proper permissions!')
                return message.channel.send(connectFail);
            }
            if (!permissions.has('SPEAK')) {
                const speakFail = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription('I cannot speak in this voice channel, please make sure I have the proper permissions!')
                return message.channel.send(speakFail);
            }

            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                const playlist = await youtube.getPlaylist(url);
                const videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                    await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
                }
                const queueSuccess = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`Playlist: **${playlist.title}** has been added to the queue!`)
                return message.channel.send(queueSuccess);
            } else {
                try {
                    var video = await youtube.getVideo(url);
                } catch (error) {
                    try {
                        var videos = await youtube.searchVideos(searchString, 10);
                        let index = 0;
                        const embed = new Discord.RichEmbed()
                            .setColor('#36393E')
                            .setFooter('Please provide a value to select one of the search results ranging from 1-10.')
                            .setTitle(`__**Song selection:**__`)
                        videos.map(video2 => embed.addField(`**${++index}.**`, `${video2.title}`));
                        message.channel.send(embed);
                        // eslint-disable-next-line max-depth
                        try {
                            var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                                maxMatches: 1,
                                time: 10000,
                                errors: ['time']
                            });
                        } catch (err) {
                            console.error(err);
                            const error = new Discord.RichEmbed()
                                .setColor('#36393E')
                                .setDescription('Nothing has been entered so I\'m cancelling video selection.')
                            return message.channel.send(error);
                        }
                        const videoIndex = parseInt(response.first().content);
                      client.users.remove('music', message.author.id)
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } catch (err) {
                        console.error(err);
                        const error = new Discord.RichEmbed()
                            .setColor('#36393E')
                            .setDescription('I could not obtain any search results.')
                        return message.channel.send(error);
                    }
                }
                return handleVideo(video, message, voiceChannel);
            }
        } else if (use === 'skip') {
            mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **skip** command in the server: ${message.guild.name} (${message.guild.id})`);
            const memberFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You are not in a voice channel!')
            if (!message.member.voiceChannel) return message.channel.send(memberFail);
            const sameIDFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You are not in the same voice channel as I am in.');
            if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(sameIDFail);
            const musicFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('There is nothing playing that I could skip for you.')
            if (!serverQueue) return message.channel.send(musicFail);
            serverQueue.connection.dispatcher.end('Skip command has been used!');
            return undefined;
        } else if (use === 'stop') {
            mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **stop** command in the server: ${message.guild.name} (${message.guild.id})`);
            const memberFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You are not in a voice channel!')
            if (!message.member.voiceChannel) return message.channel.send(memberFail);
            const sameIDFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You are not in the same voice channel as I am in.');
            if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(sameIDFail);
            const musicFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('There is nothing playing that I could stop for you.')
            if (!serverQueue) return message.channel.send(musicFail);
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end('Stop command has been used!');
            return undefined;
        } else if (use === 'volume') {
          if (message.author.id !== ownerID) return message.channel.send('Apparently, I decided to make this command donators only. Sorry for the unexpected action. I need the money so I can host the bot in a server.');
            mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **volume** command in the server: ${message.guild.name} (${message.guild.id})`);
            const memberFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You are not in a voice channel!')
            if (!message.member.voiceChannel) return message.channel.send(memberFail);
            const sameIDFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You are not in the same voice channel as I am in.');
            if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(sameIDFail);
            const musicFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('There is nothing playing.')
            if (!serverQueue) return message.channel.send(musicFail);
            const currentVolume = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription(`The current volume is: **${serverQueue.volume}**`)
            if (!args[2]) return message.channel.send(currentVolume);
            serverQueue.volume = args[2];
            serverQueue.connection.dispatcher.setVolume(args[2]);
            const volumeChange = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription(`I have set the volume to: **${args[2]}**`)
            return message.channel.send(volumeChange);
        } else if (use === 'nowplaying') {
            mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **nowplaying** command in the server: ${message.guild.name} (${message.guild.id})`);
            const notExist = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('There is nothing playing.')
            if (!serverQueue) return message.channel.send(notExist);
            const sameIDFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You are not in the same voice channel as I am in.');
            if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(sameIDFail);
            const npSuccess = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription(`Now playing: **${serverQueue.songs[0].title}**`)
            return message.channel.send(npSuccess);
        } else if (use === 'queue') {
            mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **queue** command in the server: ${message.guild.name} (${message.guild.id})`);
            const nothing = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('There is nothing playing')
            if (!serverQueue) return message.channel.send(nothing);
            const sameIDFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You are not in the same voice channel as I am in.');
            if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(sameIDFail);
            let index = 0;
            const embed = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription(`__**Song queue:**__`)
                .setTitle(`**Now playing:** ${serverQueue.songs[0].title}`)
            serverQueue.songs.map(song => embed.addField(`**${++index}.**`, `${song.title}`))
            message.channel.send(embed)
        } else if (use === 'pause') {
            mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **pause** command in the server: ${message.guild.name} (${message.guild.id})`);
            const sameIDFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You are not in the same voice channel as I am in.');
            if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(sameIDFail);
            if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                const paused = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription('I have successfully paused the music for you!')
                return message.channel.send(paused);
            }
            const pausedFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('There is nothing currently playing.')
            return message.channel.send(pausedFail);
        } else if (use === 'resume') {
            mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **resume** command in the server: ${message.guild.name} (${message.guild.id})`);
            const sameIDFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('You are not in the same voice channel as I am in.');
            if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(sameIDFail);
            if (serverQueue && !serverQueue.playing) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                const resume = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription('I have successfully resumed the music for you!')
                return message.channel.send(resume);
            }
            const fail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription('There is nothing currently playing.')
            return message.channel.send(fail);
        } else if (use === "repeat") {
            mentionHook.send(`${message.author.username}#${message.author.discriminator} used the **repeat** command in the server: ${message.guild.name} (${message.guild.id})`);
            serverQueue.repeating = !serverQueue.repeating;
            console.log(serverQueue.repeating);
            const repeat = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription(`Repeat is now on: **${serverQueue.repeating}**`)
            message.channel.send(repeat);
        } else {
            const embed = new Discord.RichEmbed()
                .setAuthor("Music Help")
                .setDescription("Input: nowplaying, pause, play, repeat, resume, skip, stop, queue, volume")
                .setFooter(`Usage: ${prefix}music <input>`)
                .setColor(`#36393E`)
            message.channel.send(embed);
        }
        return undefined;
    }
}

async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(message.guild.id);
            const connectFail = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription(`I could not join the voice channel: ${error}`)
            return message.channel.send(connectFail);
        }
    } else {
        serverQueue.songs.push(song);
        if (playlist) return undefined;
        else {
            const queueAdd = new Discord.RichEmbed()
                .setColor('#36393E')
                .setDescription(`**${song.title}** has been added to the queue!`)
            return message.channel.send(queueAdd);
        }
        return undefined;
    }
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    const embed = new Discord.RichEmbed()
        .setColor('#36393E')
        .setDescription(`Start playing: **${song.title}**`)
    serverQueue.textChannel.send(embed);
}
module.exports = music;
