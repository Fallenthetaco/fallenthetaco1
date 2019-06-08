const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const Discord = require('discord.js')
const queue = new Map();
const config = require('../config.json');
const request = require('request');
const playlistURL = 'https://api.spotify.com/v1/playlists/';
const token = 'Bearer BQCZDFmvaoohE6aG96g228T5D4gu4RloXD13T_rD1t-I1siXnekdLZpmXikzmYViolNPRwhYbUV1A3ydLYZcfGP0vamW3Ksc2sVY1tU_fYvfs_iCAhr_ks-rLpWkRxii-2y1TEVjUNmk0Y0P';
const youtube = new YouTube('AIzaSyDIc5xF7lWIpahYOKlIoij05vtP0FruwTc');
const ownerID = '286713468285878272';
const users = ['286713468285878272', '274061041669767168'];

const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class music1 extends Command {
    constructor() {
        super({
            name: 'music1',
            aliases: ['m1'],
            description: 'Shows music options',
            usage: '!music <options>',
            owner: true,
            nsfw: false,
            disabled: false
        })
    }

    async run(client, message, args) {
        const serverQueue = queue.get(message.guild.id);
        const prefix = client.guildPrefixes.get(message.guild.id);
        if (!prefix) client.guildPrefixes.set(message.guild.id, '!');
        if (args[0] === "play") {
          // await message.delete();
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

          const myURL = new URL(args.slice(1).join(' '));
          if (!myURL) return message.channel.send('You must provide a link or music name');
          const urrl = myURL.pathname;
          const get = urrl.split('/');
          
//  playlist-read-private
//  https://accounts.spotify.com/authorize?client_id=dfa3d5718b06424698558e003b88424f&scopes=playlist-read-private&response_type=code&redirect_uri=https%3A%2F%2Fapi-university.com
//   dfa3d5718b06424698558e003b88424f:791a353ea8244604bc10e7df05ac752a
          
// curl -H "Authorization: Basic ZGZhM2Q1NzE4YjA2NDI0Njk4NTU4ZTAwM2I4ODQyNGY6NzkxYTM1M2VhODI0NDYwNGJjMTBlN2RmMDVhYzc1MmE=" -d grant_type=authorization_code -d code=AQDMaXMPj2F4agLqSYLeuv1pKtVWtVphhZpnVwuM8k0s_WgqrgASFKIdQPDbinpfQKlwbXHawABHdVUAu9Z6wl0spxzkcJBfiEEcQQR_O9WFxhPTns8Cp7NevkSuOljNEKEguCwRr-ysdTRbP5R0GQMMfkP3TG2YDK9bVvfUYbGDSw9maqaK81HYu-bdRjOvCys -d redirect_uri=https%3A%2F%2Fapi-university.com https://accounts.spotify.com/api/token
          
var options = { method: 'POST',
  url: 'https://accounts.spotify.com/api/token',
  headers: 
   { 'content-type': 'application/x-www-form-urlencoded',
     'postman-token': 'df7d2c5b-9df1-213f-ba02-6db65b40c2b4',
     'cache-control': 'no-cache',
     authorization: 'Basic ZGZhM2Q1NzE4YjA2NDI0Njk4NTU4ZTAwM2I4ODQyNGY6NzkxYTM1M2VhODI0NDYwNGJjMTBlN2RmMDVhYzc1MmE=' },
  form: 
   { grant_type: 'authorization_code',
     code: 'AQB104UBeTWPjVWYTVnthmcq-pyM879C7VorU61VP3AiAIOdLqREAoT9mc68iuw1kGQjKjyFJAIZkojtVO_-vtp3cJ4KFxY8ZxaeaY3uSqrezjlQ8fEo9RrKYFbBdctsCpilC5QMjdvH38ZPxtFJxXuGAfA6vSM7WmJaTmt_qLBkBnB9Igs8-6_ICYPkSrn9cFE',
     redirect_uri: 'https://api-university.com' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

          request({url: `${playlistURL}${get[4]}/tracks`, method: 'GET', headers: {"Authorization": token}}, function(err, res) {
            if (res) {
              const playlist = JSON.parse(res.body);
              const playlist_items = playlist.items;
              // return console.log(playlist_items)
              const items = playlist_items.map(x => x.track.name);
              const tracks = playlist_items.map(x => x.track.external_urls.spotify);
              try {
                let stuff = [];
                tracks.forEach((title, index) => {
                   let obj = {};
                   obj["title"] = items[index];
                   obj["link"] = title;
                  stuff.push(obj);
                });
                console.log(stuff);

                items.forEach(async x => {                  
                  var videos = await youtube.searchVideos(x, 1);
                  let index = 0;
                  var video = await youtube.getVideoByID(videos[1 - 1].id);
                  handleMusic(video, message, voiceChannel);
                })
              } catch (err) {
                console.error(err);
                const error = new Discord.RichEmbed()
                  .setColor('#36393E')
                  .setDescription('I could not obtain any search results.')
                return message.channel.send(error);
              }
            }
            if (err) {
              console.log(err);
            }
          });
            // const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
//                   try {
//                         var videos = await youtube.searchVideos(searchString, 10);
//                         let index = 0;
//                         const embed = new Discord.RichEmbed()
//                             .setColor('#36393E')
//                             .setFooter('Please provide a value to select one of the search results ranging from 1-10.')
//                             .setTitle(`__**Song selection:**__`)
//                         videos.map(video2 => embed.addField(`**${++index}.**`, `${video2.title}`));
//                         message.channel.send(embed);
//                         // eslint-disable-next-line max-depth
//                         try {
//                             var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
//                                 maxMatches: 1,
//                                 time: 10000,
//                                 errors: ['time']
//                             });
//                         } catch (err) {
//                             console.error(err);
//                             const error = new Discord.RichEmbed()
//                                 .setColor('#36393E')
//                                 .setDescription('Nothing has been entered so I\'m cancelling video selection.')
//                             return message.channel.send(error);
//                         }
//                         const videoIndex = parseInt(response.first().content);
//                         var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
//                     } catch (err) {
//                         console.error(err);
//                         const error = new Discord.RichEmbed()
//                             .setColor('#36393E')
//                             .setDescription('I could not obtain any search results.')
//                         return message.channel.send(error);
//                     }

//                 }
//             }
// }
async function handleMusic(video, message, voiceChannel, playlist = false) {
    try {
        const serverQueue = queue.get(message.guild.id);
      // console.log(video);
        const song = {
            id: video.id,
            duration: `${video.duration.minutes}:${video.duration.seconds}`,
            title: Discord.escapeMarkdown(video.title)
            // url: `https://www.youtube.com/embed/${video.id}?vq=small`,
            // image: video.thumbnails.high.url
        }
      if (video.duration.seconds < 10) {
        song.duration = `${video.duration.minutes}:0${video.duration.seconds}`
      }
      if (video.duration.hours > 0) {
        song.duration = `${video.duration.hours}:${video.duration.minutes}:${video.duration.seconds}`
      }
        if (!serverQueue) {
            //Creates array for queue
            const queueConstruct = {
                textChannel: message.channel,
                memberRequested: message.author,
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
        const url = serverQueue.songs[0].url;
        if (serverQueue.repeating === true) return;
        const messagee = url.replace(`embed/`, `watch?v=`).replace('?vq=small', '');
        const songPlay = new Discord.RichEmbed()
            .setColor(`#36393E`)
            .addField('Length', song.duration, true)
            .addField('Requested by:', serverQueue.memberRequested.tag, true)
            .addField('URL', messagee, true)
            .setDescription(`Playing: **${serverQueue.songs[0].title}**`)
            .setImage(serverQueue.songs[0].image);
        serverQueue.textChannel.send(songPlay);

    } catch (e) {
        console.log(e)
    }
}
    }
                  }
                  }

// module.exports.help = {
//     name: "music",
//     description: 'Shows music options',
//     usage: 'music (options)'
// }
module.exports = music1;
