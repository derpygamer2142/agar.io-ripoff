export default class Player {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;

        this.r = 55//20 + (Math.random() * 10);

        this.input = this.game.input
        this.deleted = false;

        this.xv = 0
        this.yv = 0

        this.type = "player"
        this.calcX = 0
        this.calcY = 0

    }

    update() {
        // console.log(this.input.w)
        this.xv = 0
        this.yv = 0
        this.yv -= (+this.input.w - this.input.s) * -1;
        this.xv += (+this.input.d - this.input.a) * -1;

        this.xv *= (100/this.r);
        this.yv *= (100/this.r);

        this.x += this.xv;
        this.y += this.yv;

        
        //console.log(`${this.x}, ${this.y}`);

        this.game.foodBlobs.forEach(b => {
            if (this.game.blobManager.compareBlobs(this,b) == this) {
                this.game.foodBlobs.push();
            }
        });


        if (this.deleted) {
            this.game.gameState = 1;
        }

        
    }

    draw(ctx) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        let calcX = (this.game.camX - this.x)*this.game.camZoom
        let calcY = (this.game.camY - this.y)*this.game.camZoom
        calcX += this.game.camXOff
        calcY += this.game.camYOff
        //console.log(`${calcX-this.calcX}, ${calcY-this.calcY}`)
        this.calcX = calcX
        this.calcY = calcY
        
        ctx.arc(calcX, calcY, this.r*this.game.camZoom, 0, Math.PI * 2, false);
        ctx.fill();
    }

}