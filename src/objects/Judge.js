'use strict';

class Judge {
    constructor(game) {
        this._game = game;
        this._goPhrase = 'GO!';
        this._
    }

    start(seconds) {
        return new Promise((resolve, reject) => {
            let count = seconds;
            for(;count > 0;count--){
                this.setTimeCountUI(count-1, this.getAsset(seconds-count+1));
            }
            this.setTimeCountUI(seconds, this.getAsset(this._goPhrase));

            setTimeout(()=> { resolve(); },seconds*1000);
        });
    }

    getAsset(ref) {
        let assetName = ref;
        var style = { font: "128px Arial", fontWeight: 'bold', fill: "#ff0044", align: "center" };
        let text = this._game.add.text(
            this._game.world.centerX,
            this._game.world.centerY,
            ref,
            style
        );
        text.anchor.set(0.5);
        text.alpha = 0;
        return text;
        /*return this.game.add.existing( new Phaser.Sprite(
            this._game,
            this._game.world.centerX,
            this._game.world.centerY,
            assetName
        );*/
    }

    setTimeCountUI(seconds, asset) {
        setTimeout(this.drawTime.bind(this,asset),seconds*1000);
    }

    drawTime(asset) {
        asset.alpha = 1;
        let tw = this._game.add.tween(asset)
            .to({alpha: 0})
            .start();
        this._game.add.tween(asset.scale).to({x: 2, y: 2}).start();
        //destroy asset
        tw.onComplete.add(()=> {asset.destroy();}, this);
    }
}

export default Judge;