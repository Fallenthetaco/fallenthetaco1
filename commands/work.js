const {
    Command
} = require('djs-easy-command');
const Discord = require('discord.js');
const eco = require('discord-economy');
const mentionHook = new Discord.WebhookClient("529033946860748821", "83sXCuU-c1qXfU8KwksIvx4nAKU3dstC1oTfWxD9qAZ8fIU7K38ZmXYGA0vDMrF2WtQ-");
const errorBot = new Discord.WebhookClient('529091044160176138', '1vGxl9XVgWi1GiCSZtBq-eIaG4OAP6L5q9W4Klf7ENghtTD4GVM2-LJ-WvaKHcWjXGzO');

class work extends Command {
    constructor() {
        super({
            name: 'work',
            usage: '!work',
            description: 'Beginners work hard right?',
            aliases: ['w'],
            owner: false
        })
    }
    async run(client, message, args) {
      const webhook = new Discord.RichEmbed()
      .setColor('#36393E')
      .setFooter(`Server: ${message.guild.name} (${message.guild.id})`)
      .setDescription(`${message.author.tag} used the **work** command`)
        mentionHook.send(webhook);
      client.blocks.ensure('blacklist', []);
        const people = client.blocks.get('blacklist');
        if (people.includes(message.author.id)) return message.channel.send('You have been blacklisted from using economy commands.');
        if (message.guild.id === "446775078240387093") {
            if (message.channel.id === "446833507377872897") return message.channel.send('Only the work command is allowed in <#538550729875390464>')
            if (message.channel.id === "446804673152679936") return message.channel.send('Only the work command is allowed in <#538550729875390464>')
            if (message.channel.id === "530926356767309834") return message.channel.send('Only the work command is allowed in <#538550729875390464>')
        }
        if (message.guild.id === '488903197386080266') {
            if (message.channel.id === '488909261100023812') return message.channel.send('Only the work command is allowed in <#538926356780810261>')
            if (message.channel.id === '488909374551621632') return message.channel.send('Only the work command is allowed in <#538926356780810261>')
            if (message.channel.id === '514327689952493599') return message.channel.send('Only the work command is allowed in <#538926356780810261>')
            if (message.channel.id === '519392991388106773') return message.channel.send('Only the work command is allowed in <#538926356780810261>')
            if (message.channel.id === '514636522033512448') return message.channel.send('Only the work command is allowed in <#538926356780810261>')
            if (message.channel.id === '519406622938759168') return message.channel.send('Only the work command is allowed in <#538926356780810261>')
            if (message.channel.id === '488945884202270720') return message.channel.send('Only the work command is allowed in <#538926356780810261>')
            if (message.channel.id === '488949755318108170') return message.channel.send('Only the work command is allowed in <#538926356780810261>')
            if (message.channel.id === '488903804235022353') return message.channel.send('Only the work command is allowed in <#538926356780810261>')
        }
        let chance = Math.floor((Math.random() * 100) + 1);
        let chances = Math.floor((Math.random() * 100) + 1);
        let chancess = Math.floor((Math.random() * 100) + 1);
        let items = ["taco", "burrito", "quesadilla", "nachos", "rusty can", 'plastic'];
        const random = items[Math.floor(Math.random() * items.length)];
        let powerups = ['sriracha', 'salsa'];
        let choose = powerups[Math.floor(Math.random() * powerups.length)];
        client.jobs.ensure(message.author.id, 'Taco Bell Employee');
        let powerup = client.powerups.ensure(message.author.id, {
            srirachas: 0,
            jalapenos: 0,
            salsas: 0
        });
        let item = client.items.ensure(message.author.id, {
            tacos: 0,
            plastics: 0,
            burritos: 0,
            nachos: 0,
            rusty_cans: 0,
            quesadillas: 0
        });
        const failRate = Math.floor(Math.random() * 40) + 1;
        let jobs = client.jobs.get(message.author.id);




        if (jobs === 'Taco Bell Employee') {
            const srirachas = client.activatePower.get(`${message.author.id}_srirachas`);
            const jalapenos = client.activatePower.get(`${message.author.id}_jalapenos`);
            const salsas = client.activatePower.get(`${message.author.id}_salsas`);


            if (srirachas) { // x3

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 181) + 3 // 1-60
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'srirachas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (jalapenos) { // x4

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 241) + 4 // 1-60 *4 would be higher
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'jalapenos' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (salsas) { //    x2

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 121) + 2 // 500-1400 * 2 would be higher
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'salsas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);


            } else {



                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 61) + 1 // 1-60
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);
            }




        } else if (jobs === 'Operations Engineer') {
            const srirachas = client.activatePower.get(`${message.author.id}_srirachas`);
            const jalapenos = client.activatePower.get(`${message.author.id}_jalapenos`);
            const salsas = client.activatePower.get(`${message.author.id}_salsas`);



            if (srirachas) { // x3

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 2701) + 1500 // 500-1400
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'srirachas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (jalapenos) { // x4

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 3601) + 2000 // 500-1400 *4 would be higher
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'jalapenos' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (salsas) { //    x2

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 1801) + 1000 // 500-1400 * 2 would be higher
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'salsas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else {

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 901) + 500 // 500-1400
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);
            }


        } else if (jobs === 'Packaging Engineer') {
            const srirachas = client.activatePower.get(`${message.author.id}_srirachas`);
            const jalapenos = client.activatePower.get(`${message.author.id}_jalapenos`);
            const salsas = client.activatePower.get(`${message.author.id}_salsas`);


            if (srirachas) { // x3

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 4501) + 2700 // 900-2400
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'srirachas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (jalapenos) { // x4

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 6001) + 3600 // 900-2400 *4 would be higher
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'jalapenos' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (salsas) { //    x2

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 3001) + 1800 // 900-2400 * 2 would be higher
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'salsas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);

            } else {
                // x1 :point_down:
                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 1501) + 900 // 900-2400
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);
            }
        } else if (jobs === 'Associate R Manager') {
            const srirachas = client.activatePower.get(`${message.author.id}_srirachas`);
            const jalapenos = client.activatePower.get(`${message.author.id}_jalapenos`);
            const salsas = client.activatePower.get(`${message.author.id}_salsas`);


            if (srirachas) { // x3

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 5701) + 3600 // 1200-3100
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'srirachas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (jalapenos) { // x4

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 7601) + 4801 // 1200-3100
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'jalapenos' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (salsas) { //    x2

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 3801) + 2401 // 1200-3100
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'salsas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);

            } else {

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 1901) + 1200 // 1200-3100
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);
            }
        } else if (jobs === 'Assistant General Manager') {
            const srirachas = client.activatePower.get(`${message.author.id}_srirachas`);
            const jalapenos = client.activatePower.get(`${message.author.id}_jalapenos`);
            const salsas = client.activatePower.get(`${message.author.id}_salsas`);


            if (srirachas) { // x3

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 7501) + 4800 // 1600-4100
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'srirachas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (jalapenos) { // x4

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 10000) + 6400 // 1600-4100
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'jalapenos' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (salsas) { //    x2

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 5001) + 3200 // 1600-4100
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'salsas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);


            } else {


                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 2501) + 1600 //1600-4100
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);
            }
        } else if (jobs === 'R General Manager') { // 2000-5000
            const srirachas = client.activatePower.get(`${message.author.id}_srirachas`);
            const jalapenos = client.activatePower.get(`${message.author.id}_jalapenos`);
            const salsas = client.activatePower.get(`${message.author.id}_salsas`);


            if (srirachas) { // x3

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 9001) + 6000 // 2000-5000
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'srirachas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (jalapenos) { // x4

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 12001) + 8000 // 2000-5000
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'jalapenos' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (salsas) { //    x2

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 6001) + 4000 // 2000-5000
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'salsas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);

            } else {

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 3001) + 2000 //2000-5000
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);
            }



        } else if (jobs === 'Shift Manager') { //2800-6300

            const srirachas = client.activatePower.get(`${message.author.id}_srirachas`);
            const jalapenos = client.activatePower.get(`${message.author.id}_jalapenos`);
            const salsas = client.activatePower.get(`${message.author.id}_salsas`);


            if (srirachas) { // x3

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 10500) + 8400 // 2000-5000
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'srirachas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (jalapenos) { // x4

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 14000) + 11200 // 2000-5000
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'jalapenos' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (salsas) { //    x2

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 7001) + 5600 // 2000-5000
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'salsas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);

            } else {

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 3501) + 2800 //2800-6300
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);
            }
        } else if (jobs === 'Tacobell Mafia Boss') {

            const srirachas = client.activatePower.get(`${message.author.id}_srirachas`);
            const jalapenos = client.activatePower.get(`${message.author.id}_jalapenos`);
            const salsas = client.activatePower.get(`${message.author.id}_salsas`);


            if (srirachas) { // x3

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 52201) + 61200 // 2000-5000
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'sriracha' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (jalapenos) { // x4

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 69601) + 81600 // 2000-5000
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'jalapenos' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);



            } else if (salsas) { //    x2

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 34801) + 40800 // 2000-5000
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, and you used the 'salsas' powerup, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);

            } else {

                var output = await eco.Work(message.author.id, {
                    failurerate: failRate,
                    money: Math.floor(Math.random() * 17401) + 20400 //20400-37800
                });
                if (output.earned == 0) return message.reply('Aww, you did not do your job well so you earned nothing!');
                if (chance < 20) {
                    message.channel.send(`Oh look you found 1 ${random}`);

                    if (random === "taco") {
                        client.items.inc(message.author.id, 'tacos');
                    } else if (random === "burrito") {
                        client.items.inc(message.author.id, 'burritos');
                    } else if (random === "nachos") {
                        client.items.inc(message.author.id, 'nachos');
                    } else if (random === "rusty can") {
                        client.items.inc(message.author.id, 'rusty_cans');
                    } else if (random === "plastic") {
                        client.items.inc(message.author.id, 'plastics');
                    } else if (random === "quesadilla") {
                        client.items.inc(message.author.id, 'quesadillas');
                    }
                }
                if (chances < 4) {
                    message.channel.send(`Oh look, you found a powerup called ${choose}`);

                    if (choose === 'sriracha') {
                        client.powerups.inc(message.author.id, 'srirachas')
                    } else if (choose === 'salsas') {
                        client.powerups.inc(message.author.id, 'salsas')
                    }
                }
                if (chancess < 3) {
                    message.channel.send(`Oh look, you found a very rare powerup called jalapeno`);

                    client.powerups.inc(message.author.id, 'jalapenos')
                }
                const embed = new Discord.RichEmbed()
                    .setColor('#36393E')
                    .setDescription(`<@${message.author.id}>, Since you work as a/an ${jobs}, you have successfully earned ${output.earned} 🌮. Your current balance is now ${output.balance} 🌮`)
                message.channel.send(embed);
            }
        }
    }
}
module.exports = work;
