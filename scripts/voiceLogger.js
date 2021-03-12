const fs = require('fs');
const voiceLoggerFile = __dirname + '/voiceLog.txt';

function voiceHandler(oldMember, newMember){
    //newMember.setMute(true, 'fk u');
    let oldMemberChannel = oldMember.channel;
    let newMemberChannel = newMember.channel;

    //console.log(oldMemberChannel);
    //console.log(newMemberChannel);

    let date = new Date();
    let dateStr = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    if(oldMemberChannel === null && newMemberChannel !== null){
        fs.appendFileSync(voiceLoggerFile, `${dateStr}//${newMember.member.user.username} joined ${newMemberChannel.name}(${newMember.member.guild.name})\n`);
    }
    if(newMemberChannel === null){
        fs.appendFileSync(voiceLoggerFile, `${dateStr}//${newMember.member.user.username} left ${oldMemberChannel.name}(${newMember.member.guild.name})\n`);
    }
}


module.exports.voiceHandler = voiceHandler;