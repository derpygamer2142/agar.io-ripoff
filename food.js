export default class Food {
    constructor(game) {
        this.game = game;
        this.collisions = this.game.collisions;
        
        this.x = (Math.random() - 0.5) * 8000;
        this.y = (Math.random() - 0.5) * 8000;
        this.r = 5 + (Math.random() * 10);

        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;
        this.color = `rgb(${r},${g},${b})`;


        this.deleted = false;
        this.type = "food"
    }

    update() {
        
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        let calcX = (this.game.camX - this.x)*this.game.camZoom
        let calcY = (this.game.camY - this.y)*this.game.camZoom
        ctx.arc(calcX, calcY, this.r*this.game.camZoom, 0, Math.PI * 2, false);
        ctx.fill();
    }
}