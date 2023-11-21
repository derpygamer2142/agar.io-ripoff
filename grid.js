export default class Grid {
    constructor(game) {
        this.game = game;


        // note: top left

        this.gridSize = 85;
        this.squareSize = 85;
        this.gridWidth = this.gridSize * this.squareSize;

        this.x = this.gridWidth/2;
        this.y = this.gridWidth/2;
    }

    update() {
        
    }

    draw(ctx) {
        ctx.fillStyle = "black"
        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                let calcX = (this.game.camX - this.x)*this.game.camZoom + (x * this.squareSize)*this.game.camZoom //this.x - this.game.camX + (x * this.squareSize)
                let calcY =  (this.game.camY - this.y)*this.game.camZoom + (y * this.squareSize)*this.game.camZoom
                calcX += this.game.camXOff
                calcY += this.game.camYOff
                ctx.linewidth = 12 * this.game.camZoom
                ctx.strokeRect(calcX, calcY,this.squareSize*this.game.camZoom,this.squareSize*this.game.camZoom) // (y*this.squareSize)
            }
        }
    }
}