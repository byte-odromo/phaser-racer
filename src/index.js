import RaceGameState from './states/RaceGameState';
var SAFE_ZONE_WIDTH = 800;
var SAFE_ZONE_HEIGHT = 600;
var w = window.innerWidth ;//* pixelRatio,
var h = window.innerHeight ;//* pixelRatio;
var lw, lh; //landscape width/height in pixels
if ( h > w ) {
    lw = h;
    lh = w;
} else {
    lw = w;
    lh = h;
}
var aspectRatioDevice = lw/lh;
 
var aspectRatioSafeZone = SAFE_ZONE_WIDTH / SAFE_ZONE_HEIGHT;
var extraWidth = 0, extraHeight = 0;
if (aspectRatioSafeZone < aspectRatioDevice) {
    // have to add game pixels vertically in order to fill the device screen
    extraWidth = aspectRatioDevice * SAFE_ZONE_HEIGHT - SAFE_ZONE_WIDTH;
} else {
    // have to add game pixels horizontally
    extraHeight = SAFE_ZONE_WIDTH / aspectRatioDevice - SAFE_ZONE_HEIGHT;
}
 

class Game extends Phaser.Game {

	constructor() {
		super('100%', '100%', Phaser.AUTO, 'phaser-racer', null);
        //super(SAFE_ZONE_WIDTH + extraWidth, SAFE_ZONE_HEIGHT + extraHeight, Phaser.CANVAS, 'phaser-racer', null);
        

        //@see http://www.emanueleferonato.com/2014/08/28/phaser-tutorial-understanding-phaser-states/
        //this.state.add('boot', boot, false);
        //this.state.add('preload', boot, false);
        //this.state.add('pregame', boot, false);
		this.state.add('phaser-racer', RaceGameState, false);
        //this.state.add('result', boot, false);
		this.state.start('phaser-racer');
	}

}

new Game();
