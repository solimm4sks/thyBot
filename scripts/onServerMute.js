const PlaySound = require('./playSound');

function playSound(voiceChannel){
    const ps = new PlaySound(voiceChannel, 'tihi');
    ps.playSound();
}


function onServerMute(oldMember, newMember){
    const oldMemberChannel = oldMember.channel;
    const newMemberChannel = newMember.channel;

    if(newMemberChannel !== null && newMember.serverMute === true && oldMemberChannel !== null && oldMember.serverMute === false){
        playSound(newMemberChannel);
    }
}


module.exports.onServerMute = onServerMute;
