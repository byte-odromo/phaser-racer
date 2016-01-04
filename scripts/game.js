(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _statesRaceGameState = require('./states/RaceGameState');

var _statesRaceGameState2 = _interopRequireDefault(_statesRaceGameState);

var SAFE_ZONE_WIDTH = 800;
var SAFE_ZONE_HEIGHT = 600;
var w = window.innerWidth; //* pixelRatio,
var h = window.innerHeight; //* pixelRatio;
var lw, lh; //landscape width/height in pixels
if (h > w) {
    lw = h;
    lh = w;
} else {
    lw = w;
    lh = h;
}
var aspectRatioDevice = lw / lh;

var aspectRatioSafeZone = SAFE_ZONE_WIDTH / SAFE_ZONE_HEIGHT;
var extraWidth = 0,
    extraHeight = 0;
if (aspectRatioSafeZone < aspectRatioDevice) {
    // have to add game pixels vertically in order to fill the device screen
    extraWidth = aspectRatioDevice * SAFE_ZONE_HEIGHT - SAFE_ZONE_WIDTH;
} else {
    // have to add game pixels horizontally
    extraHeight = SAFE_ZONE_WIDTH / aspectRatioDevice - SAFE_ZONE_HEIGHT;
}

var Game = (function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        _classCallCheck(this, Game);

        _get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, '100%', '100%', Phaser.AUTO, 'phaser-racer', null);
        //super(SAFE_ZONE_WIDTH + extraWidth, SAFE_ZONE_HEIGHT + extraHeight, Phaser.CANVAS, 'phaser-racer', null);

        //@see http://www.emanueleferonato.com/2014/08/28/phaser-tutorial-understanding-phaser-states/
        //this.state.add('boot', boot, false);
        //this.state.add('preload', boot, false);
        //this.state.add('pregame', boot, false);
        this.state.add('phaser-racer', _statesRaceGameState2['default'], false);
        //this.state.add('result', boot, false);
        this.state.start('phaser-racer');
    }

    return Game;
})(Phaser.Game);

new Game();

},{"./states/RaceGameState":8}],2:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _FXs = require('./FXs');

var _FXs2 = _interopRequireDefault(_FXs);

var _Sounds = require('./Sounds');

var _Sounds2 = _interopRequireDefault(_Sounds);

var frontAnchor = undefined;
var scaleFactor = 2.5;

var Car = (function (_Phaser$Sprite) {
    _inherits(Car, _Phaser$Sprite);

    function Car(game, key, gridPosition, frontAnchor) {
        _classCallCheck(this, Car);

        _get(Object.getPrototypeOf(Car.prototype), 'constructor', this).call(this, game, game.world.centerX, game.world.centerY, key);
        this.frontAnchor = frontAnchor;
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.LINEAR;
        this.anchor.set(0.5);
        this.scale = new Phaser.Point(0.15 * scaleFactor, 0.15 * scaleFactor);

        this.debugInfo = new Map();

        var state = this.game.state.getCurrentState();
        this.game = game;
        this.key = key;
        this.gridPosition = gridPosition;
        this.track = state.track;
        this.startAt = gridPosition.position;
        //this.rotation = gridPosition.direction;

        this.accelerate = false;
        this.tween = null;
        this.accelerationRate = 0.0025; //should be tied to car type or track?
        this.accelerationRate = this.track.accelerationRate;
        this.maxSpeed = 1; //should be tied to car type or track?
        //this.maxSpeed = .5;//should be tied to car type or track?
        this.maxSpeed = this.track.maxSpeed;
        this.slowDownRate = 0.01; //should be tied to car type or track?
        this.slowDownRate = this.track.slowDownRate;
        this.userInteractionAllowed = false;
        this.crushed = false;
        this.crushFactor;
        this.FXs = new _FXs2['default']();
        this.sounds;
    }

    _createClass(Car, [{
        key: 'init',
        value: function init() {
            var _this = this;

            /*var style = { font: "40px Arial", fontWeight: 'bold', fill: "#ff0000", align: "center" };
            let text = this.game.add.text(
                0,
                0,
                '',
                style
            );
            this.debugText = text;*/

            this.game.physics.box2d.enable(this, true);

            var totalPathLength = this.track.path.getTotalLength();
            var position = this.startAt;
            var point = this.track.path.getPointAtLength(position);
            this.body.x = point.x * scaleFactor + 30;
            this.body.y = point.y * scaleFactor;
            this.body.angle = -90;
            this.body.rotation = this.gridPosition.direction;
            this.body.gravityScale = 0;
            this.body.friction = 9;
            this.body.restitution = -10;
            //this.body.mass = 70;
            //this.body.density = 50.0;
            //this.position.y = this.gridPosition.y;
            this['static'] = false;
            //this.body.mass = 100;
            this.body.linearDamping = 10;
            window.car = this;
            //this.z =1;

            setTimeout(function () {
                //bodyA, bodyB, length, ax, ay, bx, by, frequency, damping
                var joint = _this.game.physics.box2d.distanceJoint(_this.frontAnchor, _this, 10, 0, 0, 0, -10 * scaleFactor, 300, 80);
                joint.collideConnected = false;
            }, 100);

            this.userInteractionAllowed = true;
            var tweenHelper = { progress: 0 };
            var drift = 0;

            tweenHelper.onUpdate = function (tween, value) {
                var totalPathLength = this.track.path.getTotalLength();
                var position = this.startAt + totalPathLength * value;
                if (position >= totalPathLength) {
                    position -= totalPathLength;
                }
                var point = this.track.path.getPointAtLength(position);

                //update asset position
                this.frontAnchor.x = point.x * scaleFactor;
                this.frontAnchor.y = point.y * scaleFactor;

                this.detectCrush();

                /*
                //DEBUG
                if (this.key == 'redCar'){
                    this.drift = this.drift < this.body.angularVelocity? this.body.angularVelocity: this.drift;
                    this.debugInfo.set('drift',this.drift);
                }*/
            };

            var circuitLapTime = 5000;
            this.tween = this.game.add.tween(tweenHelper).to({ progress: 1 }, circuitLapTime);
            this.tween.timeScale = 0;
            this.tween.onUpdateCallback(tweenHelper.onUpdate.bind(this));
            this.tween.onComplete.add(function () {
                _this.game.state.getCurrentState(_this).onFinish();
            }, this);
            this.tween.repeat(this.game.state.getCurrentState().raceLaps - 1);
            this.tween.start();

            this.sounds.start().then(function () {
                _this.sounds.idle();
            });
        }
    }, {
        key: 'detectCrush',
        value: function detectCrush() {
            //should be tied to car type or track?
            /*if (this.body.angularVelocity > 10) {
                this.crush();
            }*/
            if (this.body.angularVelocity > this.track.maxAngularVelocity) {
                this.crush();
            }
        }
    }, {
        key: 'throttleOn',
        value: function throttleOn() {
            this.accelerate = true;
            if (this.userInteractionAllowed) {}
        }
    }, {
        key: 'throttleOff',
        value: function throttleOff() {
            this.accelerate = false;
        }
    }, {
        key: 'crush',
        value: function crush() {
            this.userInteractionAllowed = false;
            this.crushed = true;
            this.slowDownRate = 0.05;
            setTimeout((function () {
                this.userInteractionAllowed = true;
                this.crushed = false;
                this.slowDownRate = 0.01;
                //this.restoreLastRotation();
            }).bind(this), 2000);
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.accelerate && this.userInteractionAllowed) {
                //wake up shape 'cause rope can't do it
                this.body.applyForce(0.01, 0.01);
                this.tween.timeScale += this.accelerationRate;

                if (this.tween.timeScale > this.maxSpeed) {
                    this.tween.timeScale = this.maxSpeed;
                }

                if (this.tween.timeScale < this.maxSpeed / 2) {
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
                this.tween.timeScale -= this.slowDownRate * (this.crush ? 2 : 1);
                if (this.tween.timeScale < 0) {
                    this.tween.timeScale = 0;
                }

                if (this.FXs.isMarkingTires) {
                    this.FXs.stopTireMarks(this);
                    this.sounds.drift.stop();
                }
            }

            var vol = this.tween.timeScale * 100 / this.maxSpeed;
            this.sounds.running.volume = vol > .9 ? .9 : vol;

            /*let dtext = '';
            this.debugInfo.forEach( (value, key)=> {
                dtext+= key + '=' + value + '\n';
            })
            this.debugText.text = dtext;*/

            /*text.anchor.set(0.5);
            text.alpha = 0;
            this.debugText = text;*/

            //this.game.debug.box2dWorld();
        }
    }]);

    return Car;
})(Phaser.Sprite);

exports['default'] = Car;
module.exports = exports['default'];

},{"./FXs":3,"./Sounds":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FXs = (function () {
    function FXs() {
        _classCallCheck(this, FXs);

        this.car;
        this.tiresMark;
        this.isMarkingTires = false;
        this.lastPosition;
    }

    _createClass(FXs, [{
        key: 'startTireMarks',
        value: function startTireMarks(car) {
            this.car = car;
            this.isMarkingTires = true;
            var currPosition = this.car.position;
            var lastPosition = this.lastPosition || currPosition;
            var posRLT = this.getRearLeftTirePos(currPosition);
            var lastPosRLT = this.getRearLeftTirePos(lastPosition);
            var posRRT = this.getRearRightTirePos(currPosition);
            var lastPosRRT = this.getRearRightTirePos(lastPosition);

            if (!this.tiresMark) {
                this.tiresMark = this.car.game.add.graphics(0, 0);
                this.car.game.world.swapChildren(this.tiresMark, this.car);
                this.tiresMark.lineStyle(4, 0x333333, .3);
                this.tiresMark.moveTo(lastPosRLT.x, lastPosRLT.y);
            }
            this.tiresMark.moveTo(lastPosRLT.x, lastPosRLT.y);
            this.tiresMark.lineTo(posRLT.x, posRLT.y);
            this.tiresMark.moveTo(lastPosRRT.x, lastPosRRT.y);
            this.tiresMark.lineTo(posRRT.x, posRRT.y);
            this.lastPosition = { x: this.car.position.x, y: this.car.position.y };
        }
    }, {
        key: 'getRearLeftTirePos',
        value: function getRearLeftTirePos(pos) {
            return {
                x: pos.x + Math.cos(this.car.rotation + Phaser.Math.degToRad(60)) * (this.car.width / 1.5),
                y: pos.y + Math.sin(this.car.rotation + Phaser.Math.degToRad(60)) * (this.car.width / 1.5)
            };
        }
    }, {
        key: 'getRearRightTirePos',
        value: function getRearRightTirePos(pos) {
            return {
                x: pos.x + Math.cos(this.car.rotation + Phaser.Math.degToRad(120)) * (this.car.width / 1.5),
                y: pos.y + Math.sin(this.car.rotation + Phaser.Math.degToRad(120)) * (this.car.width / 1.5)
            };
        }
    }, {
        key: 'stopTireMarks',
        value: function stopTireMarks(car) {
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
    }, {
        key: 'carSmoke',
        value: function carSmoke(car) {}
    }]);

    return FXs;
})();

exports['default'] = FXs;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Judge = (function () {
    function Judge(game) {
        _classCallCheck(this, Judge);

        this._game = game;
        this._goPhrase = 'GO!';
    }

    _createClass(Judge, [{
        key: 'start',
        value: function start(seconds) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var count = seconds;
                for (; count > 0; count--) {
                    _this.setTimeCountUI(count - 1, _this.getAsset(seconds - count + 1));
                }
                _this.setTimeCountUI(seconds, _this.getAsset(_this._goPhrase));

                setTimeout(function () {
                    resolve();
                }, seconds * 1000);
            });
        }
    }, {
        key: 'getAsset',
        value: function getAsset(ref) {
            var assetName = ref;
            var style = { font: "128px Arial", fontWeight: 'bold', fill: "#ff0044", align: "center" };
            var text = this._game.add.text(this._game.world.centerX, this._game.world.centerY, ref, style);
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
    }, {
        key: 'setTimeCountUI',
        value: function setTimeCountUI(seconds, asset) {
            setTimeout(this.drawTime.bind(this, asset), seconds * 1000);
        }
    }, {
        key: 'drawTime',
        value: function drawTime(asset) {
            asset.alpha = 1;
            var tw = this._game.add.tween(asset).to({ alpha: 0 }).start();
            this._game.add.tween(asset.scale).to({ x: 2, y: 2 }).start();
            //destroy asset
            tw.onComplete.add(function () {
                asset.destroy();
            }, this);
        }
    }]);

    return Judge;
})();

exports['default'] = Judge;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

/**
* Flag for avoid multiple instances of Sounds class
* @type {boolean}
*/
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var singletonSounds = false;

var CarSounds = (function () {
    function CarSounds(game) {
        _classCallCheck(this, CarSounds);

        var Sounds = singletonSounds;
        this.game = game;
        this.drift = Sounds.addAudio(Sounds.CAR_DRIFT, 'car_drift');
        this.running = Sounds.addAudio(Sounds.CAR1_RUNNING, 'car_running', 0, true);
        //this.running.play();

        this.fx = Sounds.addAudio(Sounds.CAR1_SFX, 'car1_sfx');
        this.fx.allowMultiple = true;
        this.fx.addMarker(Sounds.CAR1_START, 0, 2.8);
        this.fx.addMarker(Sounds.CAR1_ACELERATE, 3, 1, .5);
        //this.fx.addMarker(Sounds.CAR1_RUNNING, 4.5, 0.4, .4, true);
        this.fx.addMarker(Sounds.CAR1_IDLE, 5, 0.6, 1, true);
        this.fx.addMarker(Sounds.CAR1_DECELERATE, 6, 1, .5);
        //Sounds.decodeAssets(this.game);
        this.assets = new Map();
    }

    _createClass(CarSounds, [{
        key: 'start',
        value: function start() {
            var Sounds = singletonSounds;
            return new Promise(function (resolve, reject) {
                Sounds.playMarker(Sounds.CAR1_SFX, Sounds.CAR1_START);
                setTimeout(function () {
                    resolve();
                }, 2800);
            });
        }
    }, {
        key: 'idle',
        value: function idle() {
            var Sounds = singletonSounds;
            //Sounds.playMarker(Sounds.CAR1_SFX, Sounds.CAR1_IDLE);
        }
    }]);

    return CarSounds;
})();

var Sounds = (function () {
    function Sounds() {
        _classCallCheck(this, Sounds);

        this.RACE_MUSIC = 'race-music';
        this.CROWD1 = 'crowd1';
        this.CAR1_SFX = 'car1_sfx';
        this.CAR1_START = 'car1_start';
        this.CAR1_ACELERATE = 'car1_acelerate';
        this.CAR1_RUNNING = 'car1_running';
        this.CAR1_IDLE = 'car1_idle';
        this.CAR1_DECELERATE = 'car1_decelerate';
        this.CAR_DRIFT = 'car_drift';
        this.game;
        this.assets = new Map();
    }

    _createClass(Sounds, [{
        key: 'getCarSounds',
        value: function getCarSounds() {
            return new CarSounds(this.game);
        }
    }, {
        key: 'decodeAssets',
        value: function decodeAssets() {
            this.game.sound.setDecodedCallback([].concat(_toConsumableArray(this.asset)), function () {
                return console.log('audio ready!');
            }, this.game);
        }
    }, {
        key: 'addAudio',
        value: function addAudio(name, assetRef) {
            var volume = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
            var loop = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

            var asset = this.game.add.audio(assetRef, volume, loop);
            this.assets.set(name, asset);
            return asset;
        }
    }, {
        key: 'playAudio',
        value: function playAudio(name) {
            this.assets.get(name).play();
        }
    }, {
        key: 'playMarker',
        value: function playMarker(name, mkrName) {
            this.assets.get(name).play(mkrName);
        }
    }, {
        key: 'stopMarker',
        value: function stopMarker(name, mkrName) {
            this.assets.get(name).stop(mkrName);
        }
    }, {
        key: 'stopAudio',
        value: function stopAudio(name) {
            this.assets.get(name).stop();
        }
    }, {
        key: 'fadeOutAudio',
        value: function fadeOutAudio(name) {
            var _this = this;

            this.assets.get(name).onFadeComplete.add(function (snd) {
                _this.stopAudio(name);
                snd.volume = 1;
            });
            this.assets.get(name).fadeOut(500);
        }
    }, {
        key: 'playRaceMusic',
        value: function playRaceMusic() {
            this.playAudio(this.RACE_MUSIC);
        }
    }, {
        key: 'stopRaceMusic',
        value: function stopRaceMusic() {
            this.fadeOutAudio(this.RACE_MUSIC);
        }
    }, {
        key: 'playCrowdSound',
        value: function playCrowdSound() {
            this.playAudio(this.CROWD1);
        }
    }, {
        key: 'carAcelerate',
        value: function carAcelerate() {

            /*this.stopMarker(this.CAR1_SFX, this.CAR1_DECELERATE);
            this.stopMarker(this.CAR1_SFX, this.CAR1_RUNNING);
            return new Promise((resolve, reject)=> {
                this.playMarker(this.CAR1_SFX, this.CAR1_ACELERATE);
                setTimeout(()=> {
                    resolve();
                },1000);
            });*/
        }
    }, {
        key: 'carRunning',
        value: function carRunning() {
            //this.playMarker(this.CAR1_SFX, this.CAR1_RUNNING);
            /* let audio = this.playAudio(this.CAR1_RUNNING);
             audio.volume = 0;*/
        }
    }, {
        key: 'carDecelerate',
        value: function carDecelerate() {
            this.stopMarker(this.CAR1_SFX, this.CAR1_ACELERATE);
            //this.stopMarker(this.CAR1_SFX, this.CAR1_RUNNING);
            this.playMarker(this.CAR1_SFX, this.CAR1_DECELERATE);
        }
    }, {
        key: 'startDrift',
        value: function startDrift() {
            this.playAudio(this.CAR_DRIFT);
        }
    }, {
        key: 'stopDrift',
        value: function stopDrift() {
            this.fadeOutAudio(this.CAR_DRIFT);
        }
    }]);

    return Sounds;
})();

if (!singletonSounds) {
    singletonSounds = new Sounds();
}

exports['default'] = singletonSounds;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Track_0 = function Track_0() {
    _classCallCheck(this, Track_0);

    this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path.setAttribute('d', 'M256.17,206.32h93.47c41.261,0,74.82-33.561,74.82-74.82s-33.56-74.82-74.82-74.82h-216c-41.26,0-74.82,33.56-74.82,74.82s33.56,74.82,74.82,74.82c0,0,61.897,0,82.53,0c18.83,0,20.67,22.68,40,22.68h91.33c53.85,0,97.5-43.65,97.5-97.5c0-53.85-43.65-97.5-97.5-97.5h-216c-26.92,0-51.3,10.91-68.94,28.56C44.91,80.2,34,104.58,34,131.5c0,53.85,43.65,97.5,97.5,97.5c0,0,63.502,0,84.67,0C233,229,236.75,206.32,256.17,206.32z');
    this.path.setAttribute('d', 'm 301.39728,204.32 45.47,0 c 41.261,0 74.82,-35.561 74.82,-76.82 0,-41.259 -33.56,-74.82 -74.82,-74.82 l -216,0 c -41.26,0 -74.820004,33.56 -74.820004,74.82 0,41.26 33.560004,76.82 74.820004,76.82 0,0 41.897,0 62.53,0 47.38283,0 59.36578,22.68 108,22.68 l 43.33,0 c 53.85,0 97.5,-45.65 97.5,-99.5 0,-53.85 -43.65,-97.5 -97.5,-97.5 l -216,0 c -26.92,0 -51.300004,10.91 -68.940004,28.56 -17.65,17.64 -28.56,42.02 -28.56,68.94 0,53.85 43.65,99.5 97.500004,99.5 0,0 43.502,0 64.67,0 46.13422,0 58.52439,-22.68 108,-22.68 z');
    this.gridPositions = [{
        position: this.path.getTotalLength() / 1.505,
        direction: Phaser.Math.degToRad(-90)
    }, {
        position: this.path.getTotalLength() / 6,
        direction: Phaser.Math.degToRad(-90)
    }];
    this.maxSpeed = 1;
    this.maxAngularVelocity = 5;
    this.accelerationRate = 0.005;
    this.slowDownRate = 0.01;
};

var Track_0_background = (function (_Phaser$Sprite) {
    _inherits(Track_0_background, _Phaser$Sprite);

    function Track_0_background(game) {
        _classCallCheck(this, Track_0_background);

        _get(Object.getPrototypeOf(Track_0_background.prototype), "constructor", this).call(this, game, game.world.centerX, game.world.centerY, 'ground');
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.LINEAR;

        this.anchor.set(0);
        this.scale = new Phaser.Point(0.365 * 2.5, 0.37 * 2.5);
        this.position.x = 0;
        this.position.y = 0;
    }

    return Track_0_background;
})(Phaser.Sprite);

var Track_1 = function Track_1() {
    _classCallCheck(this, Track_1);

    this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path.setAttribute('d', 'M 201.53064,192.11592 303.91063,89.73593 c 6.90331,-9.833628 23.69237,-42.642032 30.00072,-52.47566 18.13768,-22.845168 64.81021,-27.7462248 92.27159,-12.657451 13.17918,7.241362 25.53068,17.042102 31.47855,37.053291 3.40785,9.704277 3.8492,17.385399 3.93991,27.46333 l 0,107.26684 -0.52017,6.43876 c 1.68888,23.61892 -20.30323,44.54857 -41.84943,44.43619 -8.73883,-0.0456 -22.83469,1.24681 -35.99502,-11.95002 l -17.34037,-18.58996 c 0,0 -36.41058,-36.41056 -77.62736,-77.62735 L 253.90063,101.70148 C 239.1793,86.980164 207.87674,53.677586 206.68033,52.481187 c -4.7856,-4.785591 -12.21264,-10.263092 -18.22709,-10.263092 -11.96399,0 -124.9643,-0.157352 -124.9643,-0.157352 -19.911433,-1.572702 -31.596372,8.032478 -31.616391,20.248936 -0.01507,9.193913 7.348159,19.096984 22.384446,20.592451 l 29.72719,2.979977 c 17.094875,2.688657 37.204685,14.190453 37.471005,44.363533 0.29897,33.87174 -20.89566,43.90613 -34.896108,46.22317 -5.026641,1.03326 -25.092138,1.73574 -35.594148,3.25849 -12.33098,1.61785 -19.58177,12.39875 -19.58177,19.87223 0,9.61713 4.787231,21.42072 25.115668,21.78804 l 74.050658,-0.56793 c 41.84837,4.00157 39.09519,-12.19581 66.98115,-32.70372 L 299.91063,85.735932 c 8.55031,-7.370784 38.48886,-21.45423 51.00554,-30.213244 23.68244,-16.935487 41.62396,-22.834119 66.53453,-8.115108 6.62297,3.913343 13.10399,10.185741 17.02413,22.071763 2.75025,7.831085 2.46392,12.833373 2.44138,22.887261 l 0,99.052476 1.76338,21.09078 c -0.35007,12.27351 -8.01429,23.57605 -21.23967,22.69836 -8.45247,-0.56094 -15.04154,-7.28737 -20.60133,-13.79653 l -17.52366,-32.29591 c 0,0 -33.6223,-33.6223 -71.68276,-71.68275 l -35.892,-34.868011 C 255.79801,66.622871 219.73368,30.558531 218.43806,29.262915 213.2556,24.080458 203.70251,15.982852 184.20184,15.982852 c -12.95616,0 -119.533899,0.437046 -119.533899,0.437046 -26.27039,0.119215 -45.746138,19.63493 -46.097344,44.060824 -0.26768,18.616772 6.307739,40.034358 37.16283,45.206858 l 32.163679,1.96569 c 16.327644,0.89091 21.964424,12.98924 21.915014,25.04743 -0.0383,9.35727 -4.38646,18.11976 -20.948923,19.99824 -4.929086,0.51149 -30.192427,1.7836 -37.150424,3.2575 -24.447118,8.45533 -32.630708,26.59331 -32.710502,44.82147 -0.09499,21.6994 14.445343,42.66085 38.703323,46.28398 l 89.780876,-0.007 c 32.25277,-11.99243 25.12312,-22.93911 54.04417,-54.93897 z');
    this.gridPositions = [{
        position: this.path.getTotalLength() / 1.455,
        direction: Phaser.Math.degToRad(-45)
    }, {
        position: this.path.getTotalLength() / 4.555,
        direction: Phaser.Math.degToRad(-50)
    }];
    this.maxSpeed = .5;
    this.maxAngularVelocity = 10;
    this.accelerationRate = 0.0025;
    this.slowDownRate = 0.01;
};

var Track_1_background = (function (_Phaser$Sprite2) {
    _inherits(Track_1_background, _Phaser$Sprite2);

    function Track_1_background(game) {
        _classCallCheck(this, Track_1_background);

        _get(Object.getPrototypeOf(Track_1_background.prototype), "constructor", this).call(this, game, game.world.centerX, game.world.centerY, 'ground_1');
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.LINEAR;

        this.anchor.set(0);
        this.scale = new Phaser.Point(0.365 * 2.5, 0.37 * 2.5);
        this.position.x = 0;
        this.position.y = 0;
    }

    return Track_1_background;
})(Phaser.Sprite);

exports["default"] = {
    Track_0: Track_0,
    Track_0_background: Track_0_background,
    Track_1: Track_1,
    Track_1_background: Track_1_background
};
module.exports = exports["default"];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree1 = (function (_Phaser$Sprite) {
    _inherits(Tree1, _Phaser$Sprite);

    function Tree1(game) {
        _classCallCheck(this, Tree1);

        _get(Object.getPrototypeOf(Tree1.prototype), 'constructor', this).call(this, game, game.world.centerX, game.world.centerY, 'tree1');
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.LINEAR;

        this.anchor.set(0);
        //this.scale = new Phaser.Point(0.365*2.5, 0.37*2.5);
        this.position.x = 0;
        this.position.y = 0;
    }

    return Tree1;
})(Phaser.Sprite);

exports['default'] = Tree1;
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectsTracks = require('./../objects/Tracks');

var _objectsCar = require('./../objects/Car');

var _objectsCar2 = _interopRequireDefault(_objectsCar);

var _objectsTree = require('./../objects/Tree');

var _objectsTree2 = _interopRequireDefault(_objectsTree);

var _objectsJudge = require('./../objects/Judge');

var _objectsJudge2 = _interopRequireDefault(_objectsJudge);

var _objectsSounds = require('./../objects/Sounds');

var _objectsSounds2 = _interopRequireDefault(_objectsSounds);

var RaceGameState = (function (_Phaser$State) {
    _inherits(RaceGameState, _Phaser$State);

    function RaceGameState() {
        _classCallCheck(this, RaceGameState);

        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
            params[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(RaceGameState.prototype), 'constructor', this).apply(this, params);
        this.player1 = {};
        this.player2 = {};
        this.track = null;
    }

    _createClass(RaceGameState, [{
        key: 'preload',
        value: function preload() {
            this.load.crossOrigin = 'anonymous';
            //this.game.load.image('redCar', './assets/gfx/red_santa.png');
            this.game.load.image('redCar', './assets/gfx/red_car.png');
            //this.game.load.image('blueCar', './assets/gfx/underwear_santa.png');
            this.game.load.image('blueCar', './assets/gfx/blue_car.png');
            //this.game.load.image('ground', './assets/gfx/track_0_background_snow.png');
            this.game.load.image('ground', './assets/gfx/track_0_background_2.png');
            this.game.load.image('ground_1', './assets/gfx/track_1_background.png');
            this.game.load.image('tree1', './assets/gfx/tree1_tile.png');
            //this.game.load.image('grass', './assets/gfx/snow_tile.png');
            this.game.load.image('grass', './assets/gfx/grass_tile.png');
            //this.game.load.image('elf', './assets/gfx/elf.png');
            this.game.load.audio('raceTheme', './assets/audio/soundtracks/race_music.mp3');
            this.game.load.audio('crowd1', './assets/audio/soundeffects/crowd_1.mp3');
            this.game.load.audio('car1_sfx', 'assets/audio/soundeffects/car1_mixdown.mp3');
            this.game.load.audio('car_drift', 'assets/audio/soundeffects/car_drift.mp3');
            this.game.load.audio('car_running', 'assets/audio/soundeffects/car_running_1.mp3');
        }
    }, {
        key: 'create',
        value: function create() {
            window.gameState = this;

            _objectsSounds2['default'].game = this.game;
            _objectsSounds2['default'].addAudio(_objectsSounds2['default'].RACE_MUSIC, 'raceTheme', 1, true);
            _objectsSounds2['default'].addAudio(_objectsSounds2['default'].CROWD1, 'crowd1');
            _objectsSounds2['default'].addAudio(_objectsSounds2['default'].CAR_DRIFT, 'car_drift');
            _objectsSounds2['default'].addAudio(_objectsSounds2['default'].CAR1_RUNNING, 'car_running');

            this.game.physics.startSystem(Phaser.Physics.BOX2D);
            this.game.physics.box2d.setBoundsToWorld();
            this.game.physics.box2d.restitution = 0.0;
            this.game.physics.box2d.friction = 2;
            //this.game.physics.box2d.ptmRatio = 50;
            //this.game.physics.box2d.gravity.y = 100;
            //this.game.physics.box2d.debugDraw.joints = true;
            //this.game.physics.box2d.debugDraw.centerOfMass = true;

            // Set stage background color
            this.game.stage.backgroundColor = 0x04580B;

            //TERRAIN
            var background = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "grass");
            var tree = new _objectsTree2['default'](this.game);
            this.game.add.existing(tree);
            tree.position.x = this.game.world.centerX;
            tree.position.y = this.game.world.centerY / 2;

            // Track
            /*this.track = new Track_0();
            this.game.add.existing(
                new Track_0_background(this.game)
            );*/
            this.track = new _objectsTracks.Track_1();
            this.game.add.existing(new _objectsTracks.Track_1_background(this.game));
            this.raceLaps = 3;

            this.player1 = this.addCar(1);
            this.player2 = this.addCar(2);

            var anvil = new Phaser.Physics.Box2D.Body(this.game, null, this.game.world.centerX, 15, 1000);
            this.game.physics.box2d.enable(anvil, true);
            anvil.setCircle(5);
            //anvil.setRectangle(10, 5, 0, 0, 0);
            anvil['static'] = true;

            var judge = new _objectsJudge2['default'](this.game);
            judge.start(3).then(this.onGo.bind(this));

            // Flag to show or hide the droplets making up the fluid
            this.debug = false;
        }
    }, {
        key: 'addCar',
        value: function addCar(player) {
            var asset = player == 1 ? 'redCar' : 'blueCar';
            var polePos = player == 1 ? this.track.gridPositions[0] : this.track.gridPositions[1];
            var throttleKey = player == 1 ? Phaser.Keyboard.R : Phaser.Keyboard.B;

            // Create a car
            var frontAnchor = new Phaser.Physics.Box2D.Body(this.game, null, this.game.world.centerX, this.game.world.centerY, 0.5);
            this.game.physics.box2d.enable(frontAnchor, true);
            //frontAnchor.setCircle(5);
            //frontAnchor.static = true;
            var car = this.game.add.existing(new _objectsCar2['default'](this.game, asset, polePos, frontAnchor));
            // Set throttle
            var throttleKeyCar = this.input.keyboard.addKey(throttleKey);
            throttleKeyCar.onDown.add(car.throttleOn.bind(car), this);
            throttleKeyCar.onUp.add(car.throttleOff.bind(car), this);

            car.userInteractionAllowed = false;
            car.sounds = _objectsSounds2['default'].getCarSounds();
            car.init();
            return car;
        }
    }, {
        key: 'onGo',
        value: function onGo() {
            this.player1.userInteractionAllowed = true;
            this.player2.userInteractionAllowed = true;
            _objectsSounds2['default'].playRaceMusic();
        }
    }, {
        key: 'onFinish',
        value: function onFinish(car) {
            _objectsSounds2['default'].stopRaceMusic();
            _objectsSounds2['default'].playCrowdSound();
        }
    }, {
        key: 'zoomTo',
        value: function zoomTo(scale) {
            var duration = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];

            var bounds = this.bounds;
            var cameraBounds = this.game.camera.bounds;
            cameraBounds.x = bounds.width * (1 - scale) / 2;
            cameraBounds.y = bounds.height * (1 - scale) / 2;
            cameraBounds.width = bounds.width * scale;
            cameraBounds.height = bounds.height * scale;
            /*if (!duration) {
            } else {
                game.add.tween(cameraBounds).to({
                    x      : bounds.width  * (1 - scale) / 2,
                    y      : bounds.height * (1 - scale) / 2,
                    width  : bounds.width  * scale,
                    height : bounds.height * scale
                }, duration).start();
                return game.add.tween(this.scale).to({
                    x: scale, y: scale
                }, duration).start();
            }*/
        }
    }]);

    return RaceGameState;
})(Phaser.State);

exports['default'] = RaceGameState;
module.exports = exports['default'];

},{"./../objects/Car":2,"./../objects/Judge":4,"./../objects/Sounds":5,"./../objects/Tracks":6,"./../objects/Tree":7}]},{},[1])
//# sourceMappingURL=game.js.map
