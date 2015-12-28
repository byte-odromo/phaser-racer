'use strict'

/**
* Flag for avoid multiple instances of Sounds class
* @type {boolean}
*/
var  singletonSounds = false;

class CarSounds {
    constructor(game) {
        let Sounds = singletonSounds;
        this.game = game;
        this.drift = Sounds.addAudio(Sounds.CAR_DRIFT, 'car_drift');
        this.running = Sounds.addAudio(Sounds.CAR1_RUNNING, 'car_running', 0, true);
        console.log(this.running);
        this.running.play();

        this.fx = Sounds.addAudio(Sounds.CAR1_SFX, 'car1_sfx');
        this.fx.allowMultiple = true;
        this.fx.addMarker(Sounds.CAR1_START, 0, 2.8);
        this.fx.addMarker(Sounds.CAR1_ACELERATE, 3, 1, .5);
        //this.fx.addMarker(Sounds.CAR1_RUNNING, 4.5, 0.4, .4, true);
        this.fx.addMarker(Sounds.CAR1_IDLE, 5, 0.6, 1, true);
        this.fx.addMarker(Sounds.CAR1_DECELERATE, 6, 1, .5);
        //Sounds.decodeAssets(this.game);
        this.assets = new Map();
    }

    start() {
        let Sounds = singletonSounds;
        return new Promise((resolve, reject)=> {
            Sounds.playMarker(Sounds.CAR1_SFX, Sounds.CAR1_START);
            setTimeout(()=> {
                resolve();
            },2800);
        });
    }

    idle() {
        let Sounds = singletonSounds;
        Sounds.playMarker(Sounds.CAR1_SFX, Sounds.CAR1_IDLE);
    }
}

class Sounds {
    constructor() {
        this.RACE_MUSIC = 'race-music';
        this.CROWD1 = 'crowd1';
        this.CAR1_SFX = 'car1_sfx';
        this.CAR1_START = 'car1_start';
        this.CAR1_ACELERATE = 'car1_acelerate';
        this.CAR1_RUNNING = 'car1_running';
        this.CAR1_IDLE = 'car1_idle';
        this.CAR1_DECELERATE = 'car1_decelerate';
        this.CAR_DRIFT = 'car_drift';
        this.game;
        this.assets = new Map();
    }

    getCarSounds() {
        return new CarSounds(this.game);
    }

    decodeAssets() {
        this.game.sound.setDecodedCallback([...this.asset], ()=>console.log('audio ready!'), this.game);
    }

    addAudio(name, assetRef, volume = 1, loop = false) {
        let asset = this.game.add.audio(assetRef, volume, loop);
        this.assets.set(name, asset);
        return asset;
    }

    playAudio(name) {
        this.assets.get(name).play();
    }

    playMarker(name, mkrName) {
        this.assets.get(name).play(mkrName);
    }

    stopMarker(name, mkrName) {
        this.assets.get(name).stop(mkrName);
    }

    stopAudio(name) {
        this.assets.get(name).stop();
    }

    fadeOutAudio(name) {
        this.assets.get(name).onFadeComplete.add((snd)=> {
            this.stopAudio(name);
            snd.volume = 1;
        });
        this.assets.get(name).fadeOut(500);
    }

    playRaceMusic() {
        this.playAudio(this.RACE_MUSIC);
    }

    stopRaceMusic() {
        this.fadeOutAudio(this.RACE_MUSIC);
    }

    playCrowdSound() {
        this.playAudio(this.CROWD1);
    }

    carAcelerate() {
        
        /*this.stopMarker(this.CAR1_SFX, this.CAR1_DECELERATE);
        this.stopMarker(this.CAR1_SFX, this.CAR1_RUNNING);
        return new Promise((resolve, reject)=> {
            this.playMarker(this.CAR1_SFX, this.CAR1_ACELERATE);
            setTimeout(()=> {
                resolve();
            },1000);
        });*/
    }

    carRunning() {
        //this.playMarker(this.CAR1_SFX, this.CAR1_RUNNING);
       /* let audio = this.playAudio(this.CAR1_RUNNING);
        audio.volume = 0;*/
    }

    carDecelerate() {
        this.stopMarker(this.CAR1_SFX, this.CAR1_ACELERATE);
        //this.stopMarker(this.CAR1_SFX, this.CAR1_RUNNING);
        this.playMarker(this.CAR1_SFX, this.CAR1_DECELERATE);
    }

    startDrift() {
        this.playAudio(this.CAR_DRIFT);
    }

    stopDrift() {
        this.fadeOutAudio(this.CAR_DRIFT);
    }
}

if (!singletonSounds) {
    singletonSounds = new Sounds;
}

export default singletonSounds;