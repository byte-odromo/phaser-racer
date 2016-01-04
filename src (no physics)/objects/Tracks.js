'use strict'

class Track_0 {

    constructor() {
        this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.path.setAttribute('d', 'M256.17,206.32h93.47c41.261,0,74.82-33.561,74.82-74.82s-33.56-74.82-74.82-74.82h-216c-41.26,0-74.82,33.56-74.82,74.82s33.56,74.82,74.82,74.82c0,0,61.897,0,82.53,0c18.83,0,20.67,22.68,40,22.68h91.33c53.85,0,97.5-43.65,97.5-97.5c0-53.85-43.65-97.5-97.5-97.5h-216c-26.92,0-51.3,10.91-68.94,28.56C44.91,80.2,34,104.58,34,131.5c0,53.85,43.65,97.5,97.5,97.5c0,0,63.502,0,84.67,0C233,229,236.75,206.32,256.17,206.32z');
        this.path.setAttribute('d', 'm 301.39728,204.32 45.47,0 c 41.261,0 74.82,-35.561 74.82,-76.82 0,-41.259 -33.56,-74.82 -74.82,-74.82 l -216,0 c -41.26,0 -74.820004,33.56 -74.820004,74.82 0,41.26 33.560004,76.82 74.820004,76.82 0,0 41.897,0 62.53,0 47.38283,0 59.36578,22.68 108,22.68 l 43.33,0 c 53.85,0 97.5,-45.65 97.5,-99.5 0,-53.85 -43.65,-97.5 -97.5,-97.5 l -216,0 c -26.92,0 -51.300004,10.91 -68.940004,28.56 -17.65,17.64 -28.56,42.02 -28.56,68.94 0,53.85 43.65,99.5 97.500004,99.5 0,0 43.502,0 64.67,0 46.13422,0 58.52439,-22.68 108,-22.68 z');
        this.path.setAttribute('d', 'M 201.53064,192.11592 303.91063,89.73593 c 6.90331,-9.833628 23.69237,-42.642032 30.00072,-52.47566 18.13768,-22.845168 64.81021,-27.7462248 92.27159,-12.657451 13.17918,7.241362 25.53068,17.042102 31.47855,37.053291 3.40785,9.704277 3.8492,17.385399 3.93991,27.46333 l 0,107.26684 -0.52017,6.43876 c 1.68888,23.61892 -20.30323,44.54857 -41.84943,44.43619 -8.73883,-0.0456 -22.83469,1.24681 -35.99502,-11.95002 l -17.34037,-18.58996 c 0,0 -36.41058,-36.41056 -77.62736,-77.62735 L 253.90063,101.70148 C 239.1793,86.980164 207.87674,53.677586 206.68033,52.481187 c -4.7856,-4.785591 -12.21264,-10.263092 -18.22709,-10.263092 -11.96399,0 -110.380136,0.403577 -110.380136,0.403577 -19.911433,-1.572702 -31.596372,8.032478 -31.616391,20.248936 -0.01507,9.193913 7.348159,19.096984 22.384446,20.592451 l 15.143026,2.419048 c 17.094875,2.688657 37.204685,14.190453 37.471005,44.363533 0.29897,33.87174 -20.89566,43.90613 -34.896108,46.22317 -5.026641,1.03326 -9.947044,1.17481 -20.449054,2.69756 -12.33098,1.61785 -19.58177,12.39875 -19.58177,19.87223 0,9.61713 4.787231,21.42072 25.115668,21.78804 l 58.905564,-0.007 c 41.84837,4.00157 39.09519,-12.19581 66.98115,-32.70372 L 299.91063,85.735932 c 8.55031,-7.370784 38.48886,-21.45423 51.00554,-30.213244 23.68244,-16.935487 41.62396,-22.834119 66.53453,-8.115108 6.62297,3.913343 13.10399,10.185741 17.02413,22.071763 2.75025,7.831085 2.46392,12.833373 2.44138,22.887261 l 0,99.052476 -0.48034,5.94569 c -0.35007,12.27351 -8.01429,23.57605 -21.23967,22.69836 -8.45247,-0.56094 -15.04154,-7.28737 -20.60133,-13.79653 l -15.27994,-17.15082 c 0,0 -33.6223,-33.6223 -71.68276,-71.68275 l -35.892,-34.868011 C 255.79801,66.622871 219.73368,30.558531 218.43806,29.262915 213.2556,24.080458 203.70251,15.982852 184.20184,15.982852 c -12.95616,0 -119.533899,0.437046 -119.533899,0.437046 -26.27039,0.119215 -45.746138,19.63493 -46.097344,44.060824 -0.26768,18.616772 6.307739,40.034358 37.16283,45.206858 l 15.335797,1.40476 c 16.327647,0.89091 21.964421,12.98924 21.915016,25.04743 -0.03834,9.35727 -4.386462,18.11976 -20.948925,19.99824 -4.929086,0.51149 -13.364545,2.34453 -20.322542,3.81843 -24.447118,8.45533 -32.630708,26.59331 -32.710502,44.82147 -0.09499,21.6994 14.445343,42.66085 38.703323,46.28398 l 89.780876,-0.007 c 32.25277,-11.99243 25.12312,-22.93911 54.04417,-54.93897 z';
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