export default class Player {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;

        this.r = 55;

        this.input = this.game.input

    }

    update() {
        // console.log(this.input.w)
        this.y -= (+this.input.w - this.input.s) * -3;
        this.x += (+this.input.d - this.input.a) * -3;
        //console.log(`${this.x}, ${this.y}`);
    }

    draw(ctx) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        let calcX = this.game.camX - this.x// + this.game.gameWidth/2
        let calcY = this.game.camY - this.y// + this.game.gameHeight/2
        
        ctx.arc(calcX, calcY, this.r, 0, Math.PI * 2, false);
        ctx.fill();
    }

}