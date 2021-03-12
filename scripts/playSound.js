const Discord = require('discord.js');
const fs = require('fs');

const basNajsFl = 'basnajs.mp3';
const jedesGovnaFl = 'jedesgovna.mp3';
const cringeFl = 'cringe.mp3';
const lazesFl = 'lazimimikrija.mp3';
const lepiFl = 'lepi.mp3';
const alexaDespacitoFl = 'alexadespacito.m4a';
const isusBeziFl = 'isus_beziOdavde.mp3';
const tihiFl = 'tihitihi.mp3';
const vanjaOpFile = 'vanjaOpTheme.mp3';

const fileToPlay = {
    'bn': basNajsFl,
    'jg': jedesGovnaFl,
    'cringe': cringeFl,
    'lazes': lazesFl,
    'lepi': lepiFl,
    'ad': alexaDespacitoFl,
    'ih': isusBeziFl,
    'tihi': tihiFl,
    'vanjaop': vanjaOpFile
};

const sfwFileToPlay = {
    'bn': basNajsFl,
    'cringe': cringeFl,
    'lazes': lazesFl,
    'ad': alexaDespacitoFl
}

class PlaySound{
    constructor(channel, sound, sfw = false){
        this.channel = channel;
        this.sound = sound;
        this.sfw = sfw;
    }

    playSound(){
        this.channel.join().then(connection => {
            if(fileToPlay[this.sound] == null){
                this.channel.leave();
                return;
            }
            const dispatcher = connection.play(this.getSoundFilePath());
            dispatcher.on("finish", end => {
                this.channel.leave();
            });

        }).catch(err => console.log(err));
    }

    getSoundFilePath(){
        return __dirname + './../audio/' + (this.sfw ? sfwFileToPlay[this.sound] : fileToPlay[this.sound]);
    }
};

module.exports = PlaySound;