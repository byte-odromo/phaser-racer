'use strict'
import FXs from './FXs';
import Sounds from './Sounds';

let frontAnchor;
let scaleFactor = 2.5;
class Car extends Phaser.Sprite {
    constructor(game, key, gridPosition, frontAnchor) {
        super(game, game.world.centerX, game.world.centerY, key);
        this.frontAnchor = frontAnchor;
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.LINEAR;
        this.anchor.set(0.5);
        this.scale = new Phaser.Point(0.15*scaleFactor, 0.15*scaleFactor);

        this.debugInfo = new Map;

        let state = this.game.state.getCurrentState();
        this.game = game;
        this.key = key;
        this.gridPosition = gridPosition;
        this.track = state.track;
        this.startAt = gridPosition.position;
        //this.rotation = gridPosition.direction;

        this.accelerate = false;
        this.tween = null;
        this.accelerationRate = 0.005;
        this.maxSpeed = 1;
        this.slowDownRate = 0.01;
        this.userInteractionAllowed = false;
        this.crushed = false;
        this.rotation2Restore;
        this.crushFactor;
        this.FXs = new FXs;
        this.sounds;
    }

    init() {

        this.game.physics.box2d.enable(this,true);

        let totalPathLength = this.track.path.getTotalLength();
        let position = this.startAt;
        let point = this.track.path.getPointAtLength( position );
        this.body.x = point.x*scaleFactor+30;
        this.body.y = point.y*scaleFactor;
        this.body.angle = -90;
        this.body.gravityScale = 0;
        this.body.friction = 9;
        this.body.restitution = -10;
        //this.body.mass = 70;
        //this.body.density = 50.0;
        //this.position.y = this.gridPosition.y;
        this.static=false;
        //this.body.mass = 100;
        this.body.linearDamping = 10;
        window.car = this;
        //this.z =1;

        setTimeout(()=> {
            //bodyA, bodyB, length, ax, ay, bx, by, frequency, damping
            let joint = this.game.physics.box2d.distanceJoint(this.frontAnchor, this, 10, 0, 0, 0, -10*scaleFactor, 300, 80);
            joint.collideConnected = false;
        },100);


        this.userInteractionAllowed = true;
        let tweenHelper = {progress: 0};
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
            /*this.position.x = point.x;
            this.position.y = point.y;*/
            this.frontAnchor.x = point.x*scaleFactor;
            this.frontAnchor.y = point.y*scaleFactor;

            this.detectCrush();
            this.debugInfo.set('dsit',Phaser.Math.distance(this.position.x,this.position.y,this.frontAnchor.x,this.frontAnchor.y));

        }

        let circuitLapTime = 5000;
        this.tween = this.game.add.tween( tweenHelper ).to( {progress: 1}, circuitLapTime );
        this.tween.timeScale = 0;
        this.tween.onUpdateCallback( tweenHelper.onUpdate.bind(this) );
        this.tween.onComplete.add(()=> {this.game.state.getCurrentState(this).onFinish();}, this);
        this.tween.repeat( this.game.state.getCurrentState().raceLaps-1 );
        this.tween.start();

        this.sounds.start().then(()=> {
            this.sounds.idle();
        });
        /*Sounds.carStart().then(()=> {
            Sounds.carIdle();
        });*/
    }

    detectCrush(){
        let factor = Phaser.Math.distance(this.position.x,this.position.y,this.frontAnchor.x,this.frontAnchor.y);
        //this can't be bonded to scaleFactor becouse it depends on joint configuration and vehicle set up.
        if( factor > 125 ){
            this.crush();
        }
    }

    throttleOn() {
        this.accelerate = true;
        if (this.userInteractionAllowed) {
            /*Sounds.carAcelerate().then(()=> {
                if (this.accelerate) {
                    Sounds.carRunning();
                }
            });*/
        }
    }

    throttleOff() {
        /*if (this.accelerate) {
            Sounds.carDecelerate();
        }*/
        this.accelerate = false;
    }

    crush() {
        this.userInteractionAllowed = false;
        this.crushed = true;
        setTimeout((function(){
            this.userInteractionAllowed = true;
            this.crushed = false;
            //this.restoreLastRotation();
        }).bind(this),2000);
    }

    update() {
        if( this.accelerate && this.userInteractionAllowed){
            //wake up shape 'cause rope can't do it
            this.body.applyForce(0.1, 0.1);
            this.tween.timeScale+= this.accelerationRate;

            if( this.tween.timeScale > this.maxSpeed ){
                this.tween.timeScale = this.maxSpeed;
            }

            if (this.tween.timeScale < this.maxSpeed/2) {
                if (!this.FXs.isMarkingTires) {
                    this.sounds.drift.play();
                }
                this.FXs.startTireMarks(this);
            } else {
                if (this.FXs.isMarkingTires) {
                    this.FXs.stopTireMarks(this);
                    this.sounds.drift.stop();
                }
            }
        } else {
            this.tween.timeScale-= this.slowDownRate * (this.crush? 2:1);
            if( this.tween.timeScale < 0 ){
                    this.tween.timeScale = 0;
            }

            if (this.FXs.isMarkingTires) {
                this.FXs.stopTireMarks(this);
                this.sounds.drift.stop();
            }
        }

        let vol = this.tween.timeScale * 100 / this.maxSpeed;
        this.sounds.running.volume = vol > .9 ? .9 : vol;

        //this.game.debug.box2dWorld();
    }
}


export default Car;