const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const Discord = require('discord.js')
const queue = new Map();
const config = require('../config.json');
const youtube = new YouTube('AIzaSyDIc5xF7lWIpahYOKlIoij05vtP0FruwTc');
const ownerID = '286713468285878272';
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class music1 extends Command {
    constructor() {
        super({
            name: 'music',
            aliases: ['m'],
            description: 'Shows music options',
            usage: '!music <options>',
            owner: false,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
        const serverQueue = queue.get(message.guild.id);
        const prefix = client.guildPrefixes.get(message.guild.id);
        if (!prefix) client.guildPrefixes.set(message.guild.id, '!');
        if (args[0] === "play") {
          const webhook = new Discord.RichEmbed()
          .setColor('#36393E')
          .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
          .setDescription(`${message.member.user.tag} used the **play** command`)
            mentionHook.send(webhook);
            const playFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription("Enter the music link or music name!");
            if (!args[1]) return message.channel.send(playFail)

            const voiceChannel = message.member.voiceChannel;
            const vcFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription("You need to be in a voice channel to play music!")
            if (!voiceChannel) return message.channel.send(vcFail);

            const permissions = voiceChannel.permissionsFor(message.client.user);

            const permissionConnectFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription("I cannot connect; missing connect permissions")
            if (!permissions.has("CONNECT")) return message.channel.send(permissionConnectFail);

            const permissionSpeakFail = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription("I cannot speak; missing speak permissions")
            if (!permissions.has("SPEAK")) return message.channel.send(permissionSpeakFail);

            const searchString = args.slice(1).join(" ");
            const url = args[1].replace(/<(.+)>/g, "$1");

            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                const playlist = await youtube.getPlaylist(url);
                const videos = await playlist.getVideos();

                const playlistSent = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription(`Playlist: **${playlist.title}** has been added to the queue!`)
                message.channel.send(playlistSent);

                for (const video of Object.values(videos)) {
                    const video2 = await youtube.getVideoByID(video.id);
                    await handleMusic(video2, message, voiceChannel, true);
                }
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
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } catch (err) {
                        console.error(err);
                        const error = new Discord.RichEmbed()
                            .setColor('#36393E')
                            .setDescription('I could not obtain any search results.')
                        return message.channel.send(error);
                    }

                }
                return handleMusic(video, message, voiceChannel)
            }
        } else if (args[0] === "stop") {
          const webhook = new Discord.RichEmbed()
          .setColor('#36393E')
          .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **stop** command`)
            mentionHook.send(webhook);
            try {
                const vcFail = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("You're not in a voice channel!")
                if (!message.member.voiceChannel) return message.channel.send(vcFail);

                const queueFail = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("Nothing is playing...")
                if (!serverQueue) return message.channel.send(queueFail);


                const queueStop = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("*I see how it is...*")
                message.channel.send(queueStop);

                serverQueue.songs = [];
                serverQueue.repeating = false;
                serverQueue.connection.dispatcher.end();
                return;
            } catch (e) {
                const embed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setFooter('Command: stop')
                    .setDescription(e);
                errorBot.send(embed);
            }
        } else if (args[0] === "repeat") {
          const webhook = new Discord.RichEmbed()
          .setColor('#36393E')
          .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **repeat** command`)
            mentionHook.send(webhook);
            try {
                serverQueue.repeating = !serverQueue.repeating;
                const repeat = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription(`Repeat is now on: **${serverQueue.repeating}**`)
                message.channel.send(repeat);
            } catch (e) {
                const embed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setFooter('Command: repeat')
                    .setDescription(e);
                errorBot.send(embed);
            }
        } else if (args[0] === "skip") {
            try {
              const webhook = new Discord.RichEmbed()
              .setColor('#36393E')
              .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
              .setDescription(`${message.author.username}#${message.author.discriminator} used the **skip** command`)
                mentionHook.send(webhook);
                const skipFail = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("You're not in a voice channel!")
                if (!message.member.voiceChannel) return message.channel.send(skipFail);
                const queueFail = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("Nothing is playing...")
                if (!serverQueue) return message.channel.send(queueFail);

                const skipSuccess = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("*But I never got to fin-*")
                message.channel.send(skipSuccess);

                serverQueue.repeating = false;
                serverQueue.connection.dispatcher.end();
                return;
            } catch (e) {
                const embed = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setFooter('Command: repeat')
                    .setDescription(e);
                errorBot.send(embed);
            }
        } else if (args[0] === 'pause') {
          const webhook = new Discord.RichEmbed()
          .setColor('#36393E')
          .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **pause** command`)
            mentionHook.send(webhook);
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
        } else if (args[0] === 'resume') {
          const webhook = new Discord.RichEmbed()
          .setColor('#36393E')
          .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **resume** command`)
            mentionHook.send(webhook);
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
        } else if (args[0] === "volume") {
          if (message.author.id !== ownerID) return message.channel.send('Apparently, I decided to make this command donators only. Sorry for the unexpected action. I need the money so I can host the bot in a server.');
            client.channels.get(config.channelId).send(`${message.author.username}#${message.author.discriminator} used the **volume** command in the server: ${message.guild.name} (${message.guild.id})`);
            try {
                const volumeFail = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("You're not in a voice channel!")
                if (!message.member.voiceChannel) return message.channel.send(volumeFail);

                const musicFail = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("Nothing is playing...")
                if (!serverQueue) return message.channel.send(musicFail);


                const volume = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription(`Volume is at: **${serverQueue.volume}**`)
                if (!args[1]) return message.channel.send(volume);

                const number = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("Please enter a valid number")
                if (!Number(args[1])) return message.channel.send(number);

                const numberFail = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("Enter a positive number!")
                if (args[1] < 0) return message.channel.send(numberFail);

                serverQueue.volume = args[1];
                serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);

                const volumeSuccess = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription(`Set the volume to **${args[1]}**`)
                return message.channel.send(volumeSuccess);

            } catch (e) {
                console.log(e);
            }
        } else if (args[0] === "queue") {
          const webhook = new Discord.RichEmbed()
          .setColor('#36393E')
          .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **queue** command`)
            mentionHook.send(webhook);
            try {
                const connectFail = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("Nothing is playing...")
                if (!serverQueue) return message.channel.send(connectFail);

                let queueList = [];
                serverQueue.songs.map(song => {
                    if ((serverQueue.songs.indexOf(song) + 1) < 11) queueList.push(`**${serverQueue.songs.indexOf(song)+1}.** ${song.title}`);
                });
                if (serverQueue.songs.length > 10) queueList.push(`*(${serverQueue.songs.length} more songs)*`);
                queueList = queueList.join("\n");
                return message.channel.send(`
            __**Song Queue:**__\n
            ${queueList.trim()}\n
            ${(`**Playing: ** ${serverQueue.songs[0].title}`).trim()}
        `);
            } catch (e) {
                console.log(e);
            }
        } else if (args[0] === "info") {
          const webhook = new Discord.RichEmbed()
          .setColor('#36393E')
          .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
          .setDescription(`${message.author.username}#${message.author.discriminator} used the **info** command`)
            mentionHook.send(webhook);
            try {
                const connectFail = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription("Nothing is playing...")
                if (!serverQueue) return message.channel.send(connectFail);

                const songPlay = new Discord.RichEmbed()
                    .setColor(`#36393E`)
                    .setDescription(`Playing: **${serverQueue.songs[0].title}**`)
                return message.channel.send(songPlay);
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                const embed = new Discord.RichEmbed()
                    .setAuthor("Music Help")
                    .setDescription("info, pause, play, repeat, resume, skip, stop, queue, volume")
                    .setFooter(`Usage: ${prefix}music <input>`)
                    .setColor(`#36393E`)
                message.channel.send(embed);
                return;
            } catch (e) {
                console.log(e)
            }
        }
    }
}
async function handleMusic(video, message, voiceChannel, playlist = false) {
    try {
        const serverQueue = queue.get(message.guild.id);
        const song = {
            id: video.id,
            title: Discord.escapeMarkdown(video.title),
            url: `https://www.youtube.com/embed/${video.id}?vq=small`
        }

        if (!serverQueue) {
            //Creates array for queue
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
                repeating: false
            };
            //Creates a new map entry that can be referenced with the guild id
            queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (e) {
                console.log(e.stack);
                queue.delete(message.guild.id);
                return message.channel.send(e);
            }
        } else {
            serverQueue.songs.push(song);
            if (playlist) return;
            const addedQueue = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription(`**${song.title}** has been added to the queue!`)
            return message.channel.send(addedQueue);
        }
        return;
    } catch (e) {
        console.log(e)
    }
}

function play(guild, song) {
    try {
        const serverQueue = queue.get(guild.id);

        //If no more songs, leave channel
        if (!song) {
            const songEnd = new Discord.RichEmbed()
                .setColor(`#36393E`)
                .setDescription("Queue has ended!")
            serverQueue.textChannel.send(songEnd)
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }

        //Plays song in queue, shifts it, plays again recursively
        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
            .on("end", () => {
                if (!serverQueue.repeating) {
                    serverQueue.songs.shift();
                }
                play(guild, serverQueue.songs[0]);
            })
            .on("error", error => console.log(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

        const songPlay = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .setDescription(`Playing: **${serverQueue.songs[0].title}**`)
        serverQueue.textChannel.send(songPlay);

    } catch (e) {
        console.log(e)
    }
}

// module.exports.help = {
//     name: "music",
//     description: 'Shows music options',
//     usage: 'music (options)'
// }
module.exports = music1;
