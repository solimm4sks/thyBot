const Discord = require('discord.js');

class Rainbow{
    constructor(channel){
        this.channel = channel;
        //console.log('constructor');
    }

    start(){
        this.ok = true;
        this.asyncUpdate();
    }

    stop(){
        this.ok = false;
    }

    resolveWait() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 2000);
        });
    }
      
    async asyncUpdate() {
        let msg = await this.channel.send('loading..');
        
        let i = 0;
        while(i < 100 && this.ok){
            ++i;
            msg.edit(getRainbow(i));
            const result = await this.resolveWait();
        }
    }
};

function getRawEmbed(text){
    return new Discord.MessageEmbed().addField('Rainbow', text);
}

/*
// inside a command, event listener, etc.
const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    */

function getRainbow(ind, colorCnt = 15){
    let start = ind % RAINBOW.length;
    let curr = (start + 1) % RAINBOW.length;
    
    let res = '';
    for(let i = 0; i < colorCnt; ++i)
        res += RAINBOW[start];
    res += '\n';

    while(curr != start){
        for(let i = 0; i < colorCnt; ++i)
            res += RAINBOW[curr];
        res += '\n';
        curr = (curr + 1) % RAINBOW.length;
    }
    
    return res;
}

const RAINBOW = [
    ':blue_square:',
    //':brown_square:',
    ':orange_square:',
    ':green_square:',
    ':purple_square:'
]

module.exports = Rainbow;