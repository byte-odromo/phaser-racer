import {Track_0,Track_0_background} from './../objects/Tracks';
import Car from './../objects/Car';

class RaceGameState extends Phaser.State {
    constructor(...params){
        super(...params);
        this.cars = {};
        this.track = null;
    }

    preload() {
        this.load.crossOrigin = 'anonymous';
        this.game.load.image('redCar', './assets/gfx/red_car.png');
        //this.game.load.image('blueCar', './../assets/gfx/blue_car.png');
        this.game.load.image('ground', './assets/gfx/track_0_background.png');
    }

	create() {
        // Set stage background color
        this.game.stage.backgroundColor = 0x04580B;

        // Flag to show or hide the droplets making up the fluid
        this.debug = false;

        // Track
        this.track = new Track_0();
        this.raceLaps = 3;
        this.game.add.existing(
            new Track_0_background(this.game)
        );

        // Create a car
        let redCar = this.game.add.existing(
            new Car(this.game, 'redCar', this.track.gridPositions[0])
        );
        redCar.init();

        // Set throttle
        let throttleKeyCar1 = this.input.keyboard.addKey(Phaser.Keyboard.R);
        throttleKeyCar1.onDown.add(redCar.trhottleOn.bind( redCar ), this);
        throttleKeyCar1.onUp.add(redCar.trhottleOff.bind( redCar ), this);
	}

}

export default RaceGameState;