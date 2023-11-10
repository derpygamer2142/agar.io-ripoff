export default class Food {
    constructor(game) {
        this.game = game;
        this.collisions = this.game.collisions;
        
        this.x = (Math.random() - 0.5) * 3000;
        this.y = (Math.random() - 0.5) * 3000;
        this.r = 5 + (Math.random() * 10);

        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;
        this.color = `rgb(${r},${g},${b})`;


        this.deleted = false;
    }

    update() {
        
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        let calcX = this.game.camX - this.x
        let calcY = this.game.camY - this.y
        ctx.arc(calcX, calcY, this.r, 0, Math.PI * 2, false);
        ctx.fill();
    }
}