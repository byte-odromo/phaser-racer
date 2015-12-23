import {Track_0,Track_0_background} from './../objects/Tracks';
import Car from './../objects/Car';
import Tree from './../objects/Tree';
import Judge from './../objects/Judge';
import Sounds from './../objects/Sounds';

class RaceGameState extends Phaser.State {
    constructor(...params){
        super(...params);
        this.player1 = {};
        this.player2 = {};
        this.track = null;
    }

    preload() {
        this.load.crossOrigin = 'anonymous';
        //this.game.load.image('redCar', './assets/gfx/red_santa.png');
        this.game.load.image('redCar', './assets/gfx/red_car.png');
        //this.game.load.image('blueCar', './assets/gfx/underwear_santa.png');
        this.game.load.image('blueCar', './assets/gfx/blue_car.png');
        //this.game.load.image('ground', './assets/gfx/track_0_background_snow.png');
        this.game.load.image('ground', './assets/gfx/track_0_background.png');
        this.game.load.image('tree1', './assets/gfx/tree1_tile.png');
        //this.game.load.image('grass', './assets/gfx/snow_tile.png');
        this.game.load.image('grass', './assets/gfx/grass_tile.png');
        //this.game.load.image('elf', './assets/gfx/elf.png');
        this.game.load.audio('raceTheme', './assets/audio/soundtracks/race_music.mp3');
        this.game.load.audio('crowd1', './assets/audio/soundeffects/crowd_1.mp3');
        this.game.load.audio('car1_sfx', 'assets/audio/soundeffects/car1_mixdown.mp3');
        this.game.load.audio('car_drift', 'assets/audio/soundeffects/car_drift.mp3');
    }

    create() {
        window.gameState = this;

        Sounds.game = this.game;
        Sounds.addAudio(Sounds.RACE_MUSIC, 'raceTheme');
        Sounds.addAudio(Sounds.CROWD1, 'crowd1');
        Sounds.addAudio(Sounds.CAR_DRIFT, 'car_drift');
        
        let fx = Sounds.addAudio(Sounds.CAR1_SFX, 'car1_sfx');
        fx.allowMultiple = true;
        fx.addMarker(Sounds.CAR1_START, 0, 2.8);
        fx.addMarker(Sounds.CAR1_ACELERATE, 3, 1, .5);
        fx.addMarker(Sounds.CAR1_RUNNING, 4.5, 0.4, .4, true);
        fx.addMarker(Sounds.CAR1_IDLE, 5, 0.6, 1, true);
        fx.addMarker(Sounds.CAR1_DECELERATE, 6, 1, .5);
        //Sounds.decodeAssets(this.game);

        this.game.physics.startSystem(Phaser.Physics.BOX2D);
        this.game.physics.box2d.setBoundsToWorld();
        this.game.physics.box2d.restitution = 0.0;
        this.game.physics.box2d.friction = 2;
        //this.game.physics.box2d.ptmRatio = 50;
        //this.game.physics.box2d.gravity.y = 100;
        //this.game.physics.box2d.debugDraw.joints = true;
        //this.game.physics.box2d.debugDraw.centerOfMass = true;


        // Set stage background color
        this.game.stage.backgroundColor = 0x04580B;

        //TERRAIN
        let background = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "grass");
        let tree = new Tree(this.game);
        this.game.add.existing(tree);
        tree.position.x = this.game.world.centerX;
        tree.position.y = this.game.world.centerY/2;


        // Track
        this.track = new Track_0();
        this.raceLaps = 3;
        this.game.add.existing(
            new Track_0_background(this.game)
        );

        this.player1 = this.addCar(1);
        this.player2 = this.addCar(2);

        let anvil = new Phaser.Physics.Box2D.Body(this.game, null, this.game.world.centerX, 15, 1000);
        this.game.physics.box2d.enable(anvil,true);
        anvil.setCircle(5);
        //anvil.setRectangle(10, 5, 0, 0, 0);
        anvil.static = true;

        let judge = new Judge(this.game);
        judge.start(3).then(this.onGo.bind(this));

        // Flag to show or hide the droplets making up the fluid
        this.debug = false;
    }

    addCar(player) {
        let asset = player == 1 ? 'redCar' : 'blueCar';
        let polePos = player == 1 ? this.track.gridPositions[0] : this.track.gridPositions[1];
        let throttleKey = player == 1 ? Phaser.Keyboard.R : Phaser.Keyboard.B;
        
        // Create a car
        let frontAnchor = new Phaser.Physics.Box2D.Body(
            this.game, null, this.game.world.centerX, this.game.world.centerY, 0.5
        );
        this.game.physics.box2d.enable(frontAnchor,true);
        //frontAnchor.setCircle(5);
        //frontAnchor.static = true;
        let car = this.game.add.existing(
            new Car(this.game, asset, polePos, frontAnchor)
        );
        car.init();
        // Set throttle
        let throttleKeyCar = this.input.keyboard.addKey(throttleKey);
        throttleKeyCar.onDown.add(car.throttleOn.bind(car), this);
        throttleKeyCar.onUp.add(car.throttleOff.bind(car), this);

        car.userInteractionAllowed = false;

        return car;
    }

    onGo() {
        this.player1.userInteractionAllowed = true;
        this.player2.userInteractionAllowed = true;
        Sounds.playRaceMusic();
    }

    onFinish(car) {
        Sounds.stopRaceMusic();
        Sounds.playCrowdSound();
    }

    zoomTo(scale, duration = 500) {
        var bounds       = this.bounds;
        var cameraBounds = this.game.camera.bounds;
        cameraBounds.x      = bounds.width  * (1 - scale) / 2;
        cameraBounds.y      = bounds.height * (1 - scale) / 2;
        cameraBounds.width  = bounds.width  * scale;
        cameraBounds.height = bounds.height * scale;
        /*if (!duration) {
        } else {
            game.add.tween(cameraBounds).to({
                x      : bounds.width  * (1 - scale) / 2,
                y      : bounds.height * (1 - scale) / 2,
                width  : bounds.width  * scale,
                height : bounds.height * scale
            }, duration).start();
            return game.add.tween(this.scale).to({
                x: scale, y: scale
            }, duration).start();
        }*/
    }

}

export default RaceGameState;