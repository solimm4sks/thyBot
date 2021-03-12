const Discord = require("discord.js");
const bot = new Discord.Client();
const { stringify } = require("querystring");
const { messageHandler } = require('./scripts/commands');
const { voiceHandler } = require('./scripts/voiceLogger');
const { opTheme } = require('./scripts/opTheme');
const { onServerMute } = require('./scripts/onServerMute');
const config = require('config.json');

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
bot.login(config.TOKEN);

module.exports = bot;