export default class Grid {
    constructor(game) {
        this.game = game;


        // note: top left

        this.gridSize = 275;
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
                let calcX = this.game.camX - this.x + (x * this.squareSize) //this.x - this.game.camX + (x * this.squareSize)
                let calcY =  this.game.camY - this.y + (y * this.squareSize)
                ctx.strokeRect(calcX, calcY,this.squareSize,this.squareSize) // (y*this.squareSize)
            }
        }
    }
}