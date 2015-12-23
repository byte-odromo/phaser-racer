'use strict'

class FXs {
    constructor() {
        this.car;
        this.tiresMark;
        this.isMarkingTires = false;
        this.lastPosition;
    }

    startTireMarks(car) {
        this.car = car;
        this.isMarkingTires = true;
        let currPosition = this.car.position;
        let lastPosition = this.lastPosition || currPosition;
        let posRLT = this.getRearLeftTirePos(currPosition);
        let lastPosRLT = this.getRearLeftTirePos(lastPosition);
        let posRRT = this.getRearRightTirePos(currPosition);
        let lastPosRRT = this.getRearRightTirePos(lastPosition);

        if (!this.tiresMark) {
            this.tiresMark = this.car.game.add.graphics(0,0);
            this.car.game.world.swapChildren(this.tiresMark,this.car);
            this.tiresMark.lineStyle(4,0x333333,.3);
            this.tiresMark.moveTo(lastPosRLT.x, lastPosRLT.y);
        }
        this.tiresMark.moveTo(lastPosRLT.x, lastPosRLT.y);
        this.tiresMark.lineTo(posRLT.x, posRLT.y);
        this.tiresMark.moveTo(lastPosRRT.x, lastPosRRT.y);
        this.tiresMark.lineTo(posRRT.x, posRRT.y);
        this.lastPosition = {x: this.car.position.x, y: this.car.position.y};
    }

    getRearLeftTirePos(pos) {
        return {
            x: pos.x + Math.cos( this.car.rotation + Phaser.Math.degToRad(60) ) * ( this.car.width / 1.5 ),
            y: pos.y + Math.sin( this.car.rotation + Phaser.Math.degToRad(60) ) * ( this.car.width / 1.5 )
        }
    }

    getRearRightTirePos(pos) {
        return {
            x: pos.x + Math.cos( this.car.rotation + Phaser.Math.degToRad(120) ) * ( this.car.width / 1.5 ),
            y: pos.y + Math.sin( this.car.rotation + Phaser.Math.degToRad(120) ) * ( this.car.width / 1.5 )
        }
    }

    stopTireMarks(car) {
        this.isMarkingTires = false;

        /*let tw = this.car.game.add.tween(this.tiresMark)
            .to({alpha: 0})
            .start();
        ((asset)=> {
            tw.onComplete.add(()=> {asset.destroy();}, this);
        })(this.tiresMark);*/
        this.tiresMark = undefined;
        this.lastPosition = undefined;
    }

    carSmoke(car) {

    }
}

export default FXs;