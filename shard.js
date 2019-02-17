const Discord = require('discord.js');

const Manager = new Discord.ShardingManager('./vanguard.js');

Manager.spawn(1);
Manager.on('launch', shard => console.log(`Successfully launched shard ${shard.id}`));
