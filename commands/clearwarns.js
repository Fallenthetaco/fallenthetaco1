const Discord = require('discord.js');

const Enmap = require('enmap');
const {
  Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class clearwarn extends Command {
      constructor(){
        super({
          name: 'clearwarn',
          aliases: ['cw'],
          description: 'Clears all warns from a user',
          usage: 'clearwarn @user'
        })
      }
      async run (client, message, args) {
        mentionHook.send(`${message.author.tag} used the **clearwarns** command in the server: ${message.guild.name} (${message.guild.id})`);
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.member(message.author);
        const data = client.warnings.get(`${message.guild.id}_${user.id}`);
        if (!data) return message.channel.send('The user doesn\'t have any warns for me to clear');
        const warn = client.warnings.get(`${message.guild.id}_${user.user.username}`);

        client.warnings.delete(`${message.guild.id}_${user.id}`);
        client.warnings.delete(`${message.guild.id}_${user.user.username}`);

        message.channel.send(`I have successfully cleared ${user.user.tag}'s warns`);

      }
}
module.exports = clearwarn;
