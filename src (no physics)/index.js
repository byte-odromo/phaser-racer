import RaceGameState from './states/RaceGameState';

class Game extends Phaser.Game {

	constructor() {
		super(600, 600, Phaser.AUTO, 'game', null);
        //@see http://www.emanueleferonato.com/2014/08/28/phaser-tutorial-understanding-phaser-states/
        //this.state.add('boot', boot, false);
        //this.state.add('preload', boot, false);
        //this.state.add('pregame', boot, false);
		this.state.add('game', RaceGameState, false);
        //this.state.add('result', boot, false);
		this.state.start('game');
	}

}

new Game();
