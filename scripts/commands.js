const fs = require('fs');
const Rainbow = require('./rainbow');
const PlaySound = require('./playSound');
const Discord = require('discord.js');

const PREFIX = '//';
const subbedUsersFile = __dirname + './../data/praviLjudi.txt';
const acNudesFile = __dirname + './../data/nudes.txt';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getNickWithRealname(guild, realname){
    guild.members.fetch().then(fetchedMembers => {
        fetchedMembers.forEach(element => {
            if(element.user.username === realname){
                console.log(`returned ${element.displayName} for ${realname}`);
                return element.displayName;
            }
        });
    });
    return 'ok';
}

function getPraviLjudi(){
    return fs.readFileSync(subbedUsersFile, 'utf8').split('\r\n');
}

function poziv(msg) {
    const data = getPraviLjudi();

    msg.guild.members.fetch().then(fetchedMembers => {
        fetchedMembers.forEach(member => {
            var total = ``;
            data.forEach(savedUsername => {
                if(savedUsername === member.user.username){
                    total += `${member.user}\r\n`;
                }
            });
            if(total !== ``)
                msg.channel.send(total);
        });
    });
}

function missme(msg){
    const username = msg.author.username;
    const data = getPraviLjudi().filter(praviUsername => praviUsername !== username && praviUsername !== '');
    fs.writeFile(subbedUsersFile, data.join('\r\n'), (err) => {if(err) throw err; console.log("Pravi Ljudi was updated");});
    msg.channel.send('You will -not- be called! :(');
}

function readySomeone(username){
    const data = getPraviLjudi().filter(praviUsername => praviUsername !== username && praviUsername !== '');
    data.push(username);
    console.log(data);
    fs.writeFileSync(subbedUsersFile, data.join('\r\n'), (err) => {if(err) throw err; console.log("Pravi Ljudi was updated");});
}

function ready(msg){
    const username = msg.author.username;
    readySomeone(username);
    msg.channel.send('You will be called!');
}

function rdyall(msg){
    msg.guild.members.fetch().then(fetchedMembers => {
        fetchedMembers.forEach(member => {
            readySomeone(member.user.username);
        });
    });
}

function missall(msg){
    fs.writeFile(subbedUsersFile, '', (err) => {if(err) throw err; console.log("Pravi Ljudi was updated");});
}

const PP = 
"O------------\\\nO------------/";

function pp(msg, num){
    let total = '';
    for(let i = 0; i < num; ++i){
        total += PP + '\n';
    }
    if(total.length > 2000)
        msg.channel.send("Too many PP's (⇀‸↼‶)");
    else
        msg.channel.send(total);
}

function sendPutin(target, sender){
    return;

    senderText = (target == sender) ? '' : ` sent by ${sender}`;
    target.send(`wide putin${senderText}`, {files: ['./../data/widePutin.jpg']});
}

function rand(max){
    return Math.floor(Math.random() * max);
}

function sendAcNudes(target, sender){
    senderText = (target == sender) ? '' : ` sent by ${sender}`;
    const nudeLines = fs.readFileSync(acNudesFile, 'utf8').split('\r\n');
    const randLine = nudeLines[rand(nudeLines.length)];
    console.log(randLine);
    target.send(`ac nudes${senderText}`, {files: [randLine]});
}

function sendNudes(msg, trgt, num){
    for(let i = 0; i < Math.min(num, 100); ++i){

        let target;
        if(msg.mentions.members.first()){
            target = msg.mentions.members.first();
        }else{
            target = msg.author;
        }

        const randChoice = rand(3);
        if(randChoice > 0)
            sendAcNudes(target, msg.author);
        else
            sendPutin(target, msg.author);
    }
}

function fillmeupscotty(msg){
    let total = '';
    for(let i = 0; i < 50; ++i){
        total += 'nothing to see here\n';
    }
    msg.author.send(total);
}

function fhusParser(msg){
    let args = msg.content.substring(2).split(' ');
    let tagSplit = msg.content.substring(2).split(' -n ');
    let spaceSplit = tagSplit[0].split(' ');
    let textts = tagSplit[0].substring(1 + spaceSplit[0].length + spaceSplit[1].length + 1);
    let verboseCheck = msg.content.substring(2).split('-d');
    //console.log(textts);
    fillhimupscotty(msg, msg.mentions.members.first(), textts.length > 0 ? textts : 'nothing to see here', tagSplit.length > 1 ? tagSplit[1].split('-d')[0] : 50, verboseCheck.length > 1);
}

async function fillhimupscotty(msg, target, textToSend, numOfFillups, delayed){
    if(target == -1){
        msg.channel.send(`Missing target!`);
        return;
    }

    target = msg.mentions.members.first();
    if(target === undefined){
        msg.channel.send('Invalid target!');
        return;
    }

    if(textToSend === ''){
        msg.channel.send('Cannot send empty message!');
        return;
    }

    if(delayed){
        for(let i = 0; i < numOfFillups; ++i){
            target.send(textToSend);
            await sleep(700);
        }
        return;
    }

    let total = '';
    for(let i = 0; i < numOfFillups; ++i){
        total += textToSend + '\n';
    }
    target.send(total);
}

let rainbowsHashmap = {};

function rainbow(msg){
    let channel = msg.channel;
    let rb = new Rainbow(msg.channel);
    rb.start();

    if(channel.id in rainbowsHashmap){
        rainbowsHashmap[channel.id].push(rb);
    }else{
        rainbowsHashmap[channel.id] = [rb];
    }
}

function stopRainbow(channel){
    if(channel.id in rainbowsHashmap){
        rainbowsHashmap[channel.id].forEach(el => {
            el.stop();
        });
        delete rainbowsHashmap[channel.id];
    }
}

function playSound(msg, sound, sfw = false){
    const voiceChannel = msg.member.voice.channel;
    if(voiceChannel == null){
        msg.channel.send('You have to be in a voice channel to use this command.');
        return;
    }
    const ps = new PlaySound(voiceChannel, sound, sfw);
    ps.playSound();
}

function voiceChill(msg, member, sendMsg=''){
    if(member.voice != null){
        member.voice.kick();
        if(sendMsg != '')
            member.send('aj chill malo');
    }else{
        msg.channel.send('Cant find user in any voice channel');
    }
}

function unmute(msg, member){
    if(member.voice != null){
        member.voice.setMute(false);
    }/*else{
        msg.channel.send('member not in voice');
    }*/
}

function mute(msg, member){
    if(member.voice != null){
        member.voice.setMute(true);
    }
}


function sfwMessageHandler(msg, msgAuthor, args){
    switch(args[0]){
        case 'hi':
            msg.channel.send('Hi!', {tts: true});
            break;
        case 'kawaCat':
            msg.channel.send('https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg');
            break;
        case 'rainbow':
            rainbow(msg);
            break;
        case 'sr':
            stopRainbow(msg.channel);
            break;
        case 'pl':
            if(args.length >= 2)
                playSound(msg, args[1], true);
            break;
        case 'help':
            msg.channel.send(new Discord.MessageEmbed().addField('Help', SFWHELP));
            break;
        case 'chill':
            if(msg.mentions.members.first() != null)
                voiceChill(msg, msg.mentions.members.first());
        default:
            msg.channel.send('Wrong command');
    }
}

const SFWHELP="//help -> this page!\n//hi -> hi\n//kawaCat -> cute cat :3\n//rainbow -> rainbow\n//sr -> stop rainbow(gets laggy)\n//pl (bn, lazes, cringe, ad) -> play sound"

async function stopEarrape(msg){
    txt = msg.content.toLowerCase();
    if((txt[0] == '!' || txt[0] == '-') && (txt.includes('rape') || txt.includes('monkey') || txt.includes('piss'))){
        await sleep(3000);
        //disconnect Vasilije_Sho_Mic
        const allVcs = msg.guild.channels.cache.array().filter(r => r.type == 'voice');
        for(let i = 0; i < allVcs.length; ++i){
            const members = allVcs[i].members.array();
            for(let j = 0; j < members.length; ++j){
                member = members[j];
                if(member.user.username == 'Groovy'){
                    member.voice.kick();
                    break;
                }
            }
        }
    }
}

function deleteMisplacedCommands(msg){
    if(msg.channel.name == 'lagano-ćaskanje'){
        const isBotCommand = (msg.content[0] == '-' || (msg.content[0] == '/' && msg.content[1] == '/'));
        const isBotReply = msg.author.username == 'Groovy' || msg.author.username == 'thyBot';
        if(isBotCommand || isBotReply){
            msg.delete();
        }
    }
}

function onMessageUpdate(msg){
    //msg.guild.me.setNickname('thyBot');
    stopEarrape(msg);
    deleteMisplacedCommands(msg);
}

function pickInVC(msg){
    let authorChannelMembers = msg.member.voice.channel.members;
    authorChannelMembers.random(1)[0].user.send('its u(wu)');
}

async function shuffleThem(msg, member, amount){
    const allVcs = msg.guild.channels.cache.array().filter(r => r.type == 'voice');
    //const vcToShuffle = allVcs[allVcs.length - 2];
    const vcToShuffle = allVcs.find(r => r.name == 'Shuffle');
    const afkChannel = msg.guild.afkChannel != null ? msg.guild.afkChannel : msg.guild.channels.cache.array().filter(r => r.type == 'voice');
    for(let i = 0; i < amount; ++i){
        member.voice.setChannel(afkChannel);
        await sleep(500);
        member.voice.setChannel(vcToShuffle);
        await sleep(500);
    }
}

function dontDisturb(msg){
    const voiceChannel = msg.member.voice.channel;
    const members = voiceChannel.members.array();
    let userNames = [];
    for(let i = 0; i < members.length; ++i){
        userNames.push(members[i].user.username);
    }
    
}

function messageHandler(msg){
    onMessageUpdate(msg);

    if(msg.content.substring(0, 2) !== PREFIX)
        return;
    msgAuthor = msg.author.username;
    let args = msg.content.substring(2).split(' ');

    //if(msg.guild.name == 'JJZ2020++'){
   //     sfwMessageHandler(msg, msgAuthor, args);
    //    return;
    //}

    switch(args[0]){
        case 'fk':
            msg.channel.send('FUCK', {tts: true});
            break;
        case 'poziv':
            poziv(msg);
            break;
        case 'missme':
            missme(msg);
            break;
        case 'rdy':
            ready(msg);
            break;
        case 'pp':
            pp(msg, args.length >= 2 ? args[1] : 1);
            break;
        case 'help':
            msg.channel.send(new Discord.MessageEmbed().addField('Help', HELP));
            break;
        case 'sendnudes':
            if(msgAuthor !== 'bojana03')
                sendNudes(msg, args.length >= 2 ? args[1] : msg.author.username, args.length >= 3 ? args[2] : 1);
            else
                msg.channel.send('Bojana ne moze da igra');
            break;
        case 'loop':
            if(msg.author.username !== 'jarkela')
                msg.channel.send("//loop");
            else
                msg.channel.send('Jaricu je zabranjeno da sa zajebava sa Loopom vise');
            break;
        case 'fmus':
        case 'fillmeupscotty':
            fillmeupscotty(msg)
            break;
        case 'fhus':
        case 'fillhimupscotty':
            fhusParser(msg, args);
            break;
        case 'rainbow':
            rainbow(msg);
            break;
        case 'sr':
            stopRainbow(msg.channel);
            break;
        case 'pl':
            if(args.length >= 2)
                playSound(msg, args[1]);
            break;
        case 'chill':
            if(msg.mentions.members.first() != null)
                voiceChill(msg, msg.mentions.members.first(), 'aj chill malo');
            break;
        case 'pickinvc':
            pickInVC(msg);
            break;
        case 'shf':
        case 'shuffle':
            shuffleThem(msg, msg.mentions.members.first(), args.length > 2 ? args[2] : 5);
            break;
        case 'dontDisturb':
        case 'dd':
            dontDisturb(msg);
            break;
        default:
            //msg.channel.send('wtf :?');
            break;
    }

    if(msgAuthor === 'solimm4sks' || msgAuthor === 'solimm4sks_Mic'){
        switch(args[0]){
            case 'blkdl':
                msg.channel.bulkDelete(args[1]);
                break;
            case 'clear':
                let numMsg = 1 + (args.length >= 2 ? parseInt(args[1]) : 1);
                if(numMsg >= 2 && numMsg <= 100)
                    msg.channel.bulkDelete(numMsg).then(messages => console.log(`Bulk deleted ${messages.size} messages`));
                else{
                    console.log(`numMsg has to be more than 2 and less than 100`);
                    //msg.channel.send('Has to be 2 or more messages!');
                }
                break;
            case 'rdyall':
                rdyall(msg);
                msg.delete();
                break;
            case 'missall':
                missall(msg);
                msg.delete();
                break;
            case 'unmute':
                if(msg.mentions.members.first() != null)
                    unmute(msg, msg.mentions.members.first());
                break;
            case 'mute':
                if(msg.mentions.members.first() != null)
                    mute(msg, msg.mentions.members.first());
                break;
            case 'shuffleall':
                msg.member.voice.channel.members.forEach((member, index) => {try{shuffleThem(msg, member, args.length > 1 ? args[1] : 5);}catch{}});
                break;
        }
    }

    //msg.delete();
}

const HELP = 
"//help -> help (this)\n\n//fk -> fuck\n\n//poziv -> @'s everyone that is ready\n\n//missme -> you stop being ready\n\n"+
"//rdy -> you become ready\n\n//pp <num of pp> -> yes\n\n//sendnudes <?@someone> -> wide putin or nudes? take your chance, or make someone take it\n\n"+
"//loop -> DONT.\n\n//fmus or //fillmeupscotty -> fills up your dm's\n\n//fhus or //fillhimupscotty <@someone> <?text to send someone> -> fills up someones dm's (-.-')"+
"\n-- use '-n <x>' after the text if there is any to send message exactly x times (default x=50)\n-- use '-d' to delay each message so its more spammy\n-- e.g. //fhus @meda fali nam 5. -n 10 -d\n\n"+
"//rainbow -> rainbow!\n\n//sr -> stop all rainbows in this channel\n\n//pl (bn, jg, cringe, lazes, lepi, ad, ih, tihi, vanjaop) -> PLay a sound file\n\n//chill <@someone> -> kicks the person out of voice\n\n"+
"//pickinvc -> picks someone in the vc at random\n\n//shf or //shuffle <@someone> <?amount> -> shuffles someone through channels";

module.exports.messageHandler = messageHandler;