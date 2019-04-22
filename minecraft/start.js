
    Command
} = require('djs-easy-command');

class start extends Command {
    constructor() {
        super({
            name: 'start',
            usage: '!m start',
            category: 'rpg',
            description: 'Start of your minecraft adventure',
            aliases: ['s'],
            owner: false
        })
    }
    async run(client, message, args) {
      
    }
}
module.exports = start;