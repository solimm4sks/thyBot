const PlaySound = require('./playSound');


themeMap = {
    //'illmeso':'ih',
    //'Vanjanja': 'vanjaop'
};


function playSound(voiceChannel, sound){
    const ps = new PlaySound(voiceChannel, sound);
    ps.playSound();
}


function opTheme(oldMember, newMember){
    //newMember.setMute(true, 'fk u');
    const oldMemberChannel = oldMember.channel;
    const newMemberChannel = newMember.channel;

    //console.log(oldMemberChannel);
    //console.log(newMemberChannel);

    if(!(newMemberChannel !== null && oldMemberChannel === null))
        return;

    const newMemberUsername = newMember.member.user.username;
    if(newMemberUsername in themeMap){
        playSound(newMemberChannel, themeMap[newMemberUsername]);
    }
}


module.exports.opTheme = opTheme;