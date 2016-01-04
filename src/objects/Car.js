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
        this.accelerationRate = 0.0025;//should be tied to car type or track?
        this.accelerationRate = this.track.accelerationRate;
        this.maxSpeed = 1;//should be tied to car type or track?
        //this.maxSpeed = .5;//should be tied to car type or track?
        this.maxSpeed = this.track.maxSpeed;
        this.slowDownRate = 0.01;//should be tied to car type or track?
        this.slowDownRate = this.track.slowDownRate;
        this.userInteractionAllowed = false;
        this.crushed = false;
        this.crushFactor;
        this.FXs = new FXs;
        this.sounds;
    }

    init() {

        /*var style = { font: "40px Arial", fontWeight: 'bold', fill: "#ff0000", align: "center" };
        let text = this.game.add.text(
            0,
            0,
            '',
            style
        );
        this.debugText = text;*/

        this.game.physics.box2d.enable(this,true);

        let totalPathLength = this.track.path.getTotalLength();
        let position = this.startAt;
        let point = this.track.path.getPointAtLength( position );
        this.body.x = point.x*scaleFactor+30;
        this.body.y = point.y*scaleFactor;
        this.body.angle = -90;
        this.body.rotation = this.gridPosition.direction;
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
        let drift = 0;

        tweenHelper.onUpdate = function(tween, value){
            let totalPathLength = this.track.path.getTotalLength();
            let position = this.startAt + totalPathLength * value;
            if( position >= totalPathLength ){
                    position-=totalPathLength;
            }
            let point = this.track.path.getPointAtLength( position );

            //update asset position
            this.frontAnchor.x = point.x*scaleFactor;
            this.frontAnchor.y = point.y*scaleFactor;

            this.detectCrush();

            /*
            //DEBUG
            if (this.key == 'redCar'){
                this.drift = this.drift < this.body.angularVelocity? this.body.angularVelocity: this.drift;
                this.debugInfo.set('drift',this.drift);
            }*/
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
    }

    detectCrush(){
        //should be tied to car type or track?
        /*if (this.body.angularVelocity > 10) {
            this.crush();
        }*/
        if (this.body.angularVelocity > this.track.maxAngularVelocity) {
            this.crush();
        }
    }

    throttleOn() {
        this.accelerate = true;
        if (this.userInteractionAllowed) {
        }
    }

    throttleOff() {
        this.accelerate = false;
    }

    crush() {
        this.userInteractionAllowed = false;
        this.crushed = true;
        this.slowDownRate = 0.05;
        setTimeout((function(){
            this.userInteractionAllowed = true;
            this.crushed = false;
            this.slowDownRate = 0.01;
            //this.restoreLastRotation();
        }).bind(this),2000);
    }

    update() {
        if( this.accelerate && this.userInteractionAllowed){
            //wake up shape 'cause rope can't do it
            this.body.applyForce(0.01, 0.01);
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

        /*let dtext = '';
        this.debugInfo.forEach( (value, key)=> {
            dtext+= key + '=' + value + '\n';
        })
        this.debugText.text = dtext;*/
        
        /*text.anchor.set(0.5);
        text.alpha = 0;
        this.debugText = text;*/
        
        this.game.debug.box2dWorld();
    }
}


export default Car;