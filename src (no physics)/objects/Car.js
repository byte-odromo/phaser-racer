'use strict'

class Car extends Phaser.Sprite {
    constructor(game, key, gridPosition) {
        super(game, 100, 100, key);
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.anchor.set(0.5);
        this.scale = new Phaser.Point(0.15, 0.15);

        this.debugInfo = new Map;

        let state = this.game.state.getCurrentState();
        this.game = game;
        this.key = key;
        this.gridPosition = gridPosition;
        this.track = state.track;
        this.startAt = gridPosition.position;
        this.rotation = gridPosition.direction;

        this.accelerate = false;
        this.tween = null;
        this.accelerationRate = 0.005;
        this.maxSpeed = 1;
        this.slowDownRate = 0.01;
        this.userInteractionAllowed = false;
        this.crushed = false;
        this.rotation2Restore;
        this.crushFactor;

    }

    init() {
        this.userInteractionAllowed = true;
        let tweenHelper = {progress: 0};
        let prevPoint = this.position;
        let angle = this.rotation;
        let prevAngle = this.rotation;
        let drift = 0;
        tweenHelper.onUpdate = function(tween, value){
            let totalPathLength = this.track.path.getTotalLength();
            let position = this.startAt + totalPathLength * value;
            if( position >= totalPathLength ){
                    position-=totalPathLength;
            }
            let point = this.track.path.getPointAtLength( position );

            //update asset position
            this.position.x = point.x;
            this.position.y = point.y;

            prevAngle = angle;
            angle = this.game.math.angleBetween(
                point.x, point.y,
                prevPoint.x, prevPoint.y
            );

            if( angle != 0 ){
                this.rotation2Restore = angle + this.gridPosition.direction;
            }

            if( this.crushed ){
                this.rotation+=0.3*this.crushFactor;
            }else{


                if( angle != 0 ){
                    this.rotation = angle + this.gridPosition.direction;
                }

                drift = ((Math.abs(Math.abs(angle)-Math.abs(prevAngle)) * this.tween.timeScale * 100));
                
                this.debugInfo.set('drift',drift);
                this.debugInfo.set('angle',angle);
                this.debugInfo.set('prevAngle',prevAngle);

                this.detectCrush(drift, angle);
            }



            prevPoint = point;
        }

        let circuitLapTime = 5000;
        this.tween = this.game.add.tween( tweenHelper ).to( {progress: 1}, circuitLapTime );
        this.tween.timeScale = 0;
        this.tween.onUpdateCallback( tweenHelper.onUpdate.bind(this) );
        this.tween.repeat( this.game.state.getCurrentState().raceLaps-1 );
        this.tween.start();
    }

    detectCrush(drift, angle){
        if( drift > 4 ){
            this.crush();
            this.crushFactor = angle > 0? 1 : -1;
        }
    }

    restoreLastRotation() {
        this.rotation = this.rotation2Restore;
    }

    trhottleOn() {
        this.accelerate = true;
    }

    trhottleOff() {
        this.accelerate = false;
    }

    crush() {
        this.userInteractionAllowed = false;
        this.crushed = true;
        setTimeout((function(){
            this.userInteractionAllowed = true;
            this.crushed = false;
            this.restoreLastRotation();
        }).bind(this),2000);
    }

    update() {
        if( this.accelerate && this.userInteractionAllowed){
            this.tween.timeScale+= this.accelerationRate;
            if( this.tween.timeScale > this.maxSpeed ){
                    this.tween.timeScale = this.maxSpeed;
            }
        }else{
            this.tween.timeScale-= this.slowDownRate * (this.crush? 2:1);
            if( this.tween.timeScale < 0 ){
                    this.tween.timeScale = 0;
            }
        }

        this.debugInfo.set( 'speed', this.tween.timeScale );
        let i = 1;
        this.debugInfo.forEach((value,key)=>{
            this.game.debug.text(`${key}: ${value}`, 32, 32*i++);
        });
    }
}

export default Car;