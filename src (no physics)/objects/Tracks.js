'use strict'

class Track_0 {

    constructor() {
        this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.path.setAttribute('d', 'M256.17,206.32h93.47c41.261,0,74.82-33.561,74.82-74.82s-33.56-74.82-74.82-74.82h-216c-41.26,0-74.82,33.56-74.82,74.82s33.56,74.82,74.82,74.82c0,0,61.897,0,82.53,0c18.83,0,20.67,22.68,40,22.68h91.33c53.85,0,97.5-43.65,97.5-97.5c0-53.85-43.65-97.5-97.5-97.5h-216c-26.92,0-51.3,10.91-68.94,28.56C44.91,80.2,34,104.58,34,131.5c0,53.85,43.65,97.5,97.5,97.5c0,0,63.502,0,84.67,0C233,229,236.75,206.32,256.17,206.32z');
        this.path.setAttribute('d', 'm 301.39728,204.32 45.47,0 c 41.261,0 74.82,-35.561 74.82,-76.82 0,-41.259 -33.56,-74.82 -74.82,-74.82 l -216,0 c -41.26,0 -74.820004,33.56 -74.820004,74.82 0,41.26 33.560004,76.82 74.820004,76.82 0,0 41.897,0 62.53,0 47.38283,0 59.36578,22.68 108,22.68 l 43.33,0 c 53.85,0 97.5,-45.65 97.5,-99.5 0,-53.85 -43.65,-97.5 -97.5,-97.5 l -216,0 c -26.92,0 -51.300004,10.91 -68.940004,28.56 -17.65,17.64 -28.56,42.02 -28.56,68.94 0,53.85 43.65,99.5 97.500004,99.5 0,0 43.502,0 64.67,0 46.13422,0 58.52439,-22.68 108,-22.68 z');
        this.gridPositions = [{ 
            position: this.path.getTotalLength()/1.505,
            direction: 270 * Math.PI / 180
        },{
            position: this.path.getTotalLength()/6,
            direction: 270 * Math.PI / 180
        }];
    }


}

class Track_0_background extends Phaser.Sprite {
    constructor(game) {
        super(game, 100, 100, 'ground');
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.anchor.set(0);
        this.scale = new Phaser.Point(0.365, 0.37);
        this.position.x=0;
        this.position.y=0;
    }
}

export default {
    Track_0: Track_0,
    Track_0_background: Track_0_background
}