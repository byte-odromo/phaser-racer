'use strict'

class Grass extends Phaser.Sprite {
    constructor(game) {
        super(game, game.world.centerX, game.world.centerY, 'grass');
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.LINEAR;

        this.anchor.set(0);
        //this.scale = new Phaser.Point(0.365*2.5, 0.37*2.5);
        this.position.x=0;
        this.position.y=0;
    }
}

export default Tree1;