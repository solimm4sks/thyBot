const Discord = require("discord.js");
const bot = new Discord.Client();
const { stringify } = require("querystring");
const { messageHandler } = require('./scripts/commands');
const { voiceHandler } = require('./scripts/voiceLogger');
const { opTheme } = require('./scripts/opTheme');
const { onServerMute } = require('./scripts/onServerMute');
require('dotenv').config();

bot.on('message', (msg) => {
    try{
        messageHandler(msg);
    }catch(err){
        console.log(err);
    }
})

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    try{
        voiceHandler(oldMember, newMember);
        onServerMute(oldMember, newMember);
        opTheme(oldMember, newMember);
    }catch(err){
        console.log(err);
    }
});

bot.on('ready', () => { 
    console.log('its alive'); 
    //bot.user.setUsername('thyBot');
    //bot.user.setAvatar('avatar.png');
});
bot.login(process.env.TOKEN);

module.exports = bot;

// fix -> https://stackoverflow.com/questions/60925319/i-am-getting-this-error-ffmpeg-avconv-not-found