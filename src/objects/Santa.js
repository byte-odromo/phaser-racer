'use strict'

let frontAnchor;
let scaleFactor = 2.5;
class Car extends Phaser.Sprite {
    constructor(game, key, gridPosition, frontAnchor) {
        super(game, game.world.centerX, game.world.centerY, key);
        this.frontAnchor = frontAnchor;
        this.frontAnchorImg = game.add.existing(
            new Phaser.Sprite(game, frontAnchor.x, frontAnchor.y, 'elf')
        );
        this.frontAnchorImg.scale = new Phaser.Point(0.15*scaleFactor, 0.15*scaleFactor);
        this.frontAnchorImg.anchor.set(0.5,1);
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

        setTimeout(()=> {
            //bodyA, bodyB, length, ax, ay, bx, by, frequency, damping
            let joint = this.game.physics.box2d.distanceJoint(this.frontAnchor, this, 10, 0, 0, 0, -10*scaleFactor, 300, 80);
            joint.collideConnected = false;
        },100);


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
            /*this.position.x = point.x;
            this.position.y = point.y;*/
            this.frontAnchor.x = point.x*scaleFactor;
            this.frontAnchor.y = point.y*scaleFactor;

            let angle = this.game.math.angleBetween(
                point.x, point.y,
                prevPoint.x, prevPoint.y
            );
            this.frontAnchorImg.x = this.frontAnchor.x;
            this.frontAnchorImg.y = this.frontAnchor.y;
            if (angle != 0) {
                this.frontAnchorImg.rotation = angle-90*Math.PI/180;
            }

            this.detectCrush();
            this.debugInfo.set('dsit',Phaser.Math.distance(this.position.x,this.position.y,this.frontAnchor.x,this.frontAnchor.y));

            prevPoint = point;
        }

        let circuitLapTime = 5000;
        this.tween = this.game.add.tween( tweenHelper ).to( {progress: 1}, circuitLapTime );
        this.tween.timeScale = 0;
        this.tween.onUpdateCallback( tweenHelper.onUpdate.bind(this) );
        this.tween.repeat( this.game.state.getCurrentState().raceLaps-1 );
        this.tween.start();
    }

    detectCrush(){
        let factor = Phaser.Math.distance(this.position.x,this.position.y,this.frontAnchor.x,this.frontAnchor.y);
        //this can't be bonded to scaleFactor becouse it depends on joint configuration and vehicle set up.
        if( factor > 125 ){
            this.crush();
        }
    }

    restoreLastRotation() {
        this.rotation = this.rotation2Restore;
    }

    throttleOn() {
        this.accelerate = true;
    }

    throttleOff() {
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
            this.body.applyForce(0.1, 0.1);
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

        //this.debugInfo.set( 'speed', this.tween.timeScale );
        /*let i = 1;
        this.debugInfo.forEach((value,key)=>{
            this.game.debug.text(`${key}: ${value}`, 32, 32*i++);
        });*/
        //this.body.thrust(0);
        //this.body.rotateLeft(0);

        //this.game.debug.box2dWorld();
    }
}

export default Car;