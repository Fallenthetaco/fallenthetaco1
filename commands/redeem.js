const Discord = require('discord.js');
const {
    Command
} = require('djs-easy-command');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class redeem extends Command {
    constructor() {
        super({
            name: 'redeem',
            aliases: ['rd'],
            category: 'util',
            description: 'Redeems a key after donating money to FallenTheTaco',
            usage: '!redeem <key>'
        })
    }
    async run(client, message, args) {
        const date = new Date();
        const serverCheck = client.servers.get(`${message.guild.id}`);
        if (serverCheck) return message.channel.send('Your server is already premium');
        const redeem180 = client.keys180.get('keys180');
        const redeem365 = client.keys365.get('keys365');
        const keys = args[0];
        if (!keys) return message.channel.send('You must provide the key')
        const check = redeem365.includes(keys) || redeem180.includes(keys);
        if (!check) return message.channel.send('This is not the correct key. Please try again with the valid key next time.')
        if (redeem180.includes(keys)) {

            let final = Math.floor(Date.now() + 15552000000)
            client.keys180.remove('keys180', keys);
            client.servers.set(`${message.guild.id}`, final)

        } else if (redeem365.includes(keys)) {

            const final = Math.floor(date + 31536000000);
            client.keys365.remove('keys365', keys);
            client.servers.set(`${message.guild.id}`, final)
        }
        message.channel.send('Thank you for redeeming this key. Your server is now premium.');
        console.log(client.keys)
    }
    // module.exports.help = {
    //     name: 'redeem',
    //     description: 'Redeems a key after donating money to FallenTheTaco',
    //     usage: 'redeem (key)'
    // };
}
module.exports = redeem;
