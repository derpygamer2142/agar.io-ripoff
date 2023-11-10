import Grid from "./grid.js";
import Player from "./player.js";
import Input from "./input.js";
import Blob from "./blobs.js";
import Collisions from "./collisions.js";
import Utils from "./utilsnstuff.js";
import Food from "./food.js";

export default class Game {
    constructor(WIDTH, HEIGHT) {
        this.gameWidth = WIDTH;
        this.gameHeight = HEIGHT;

        this.camX = 0;
        this.camY = 0;

        this.collisions = new Collisions();
        this.utils = new Utils();

        this.grid = new Grid(this);
        this.input = new Input(this);
        this.player = new Player(this);


        this.camX = this.player.x;
        this.camY = this.player.y;

        this.aiStates = ["follow","afk","wander","search"];//["search","afk","wander","agressive","follow"];
        this.blobs = [];
        this.foodBlobs = [];

        for (let i = 0; i < 2500; i ++) {
            this.blobs.push(new Blob(this,this.utils.randItem(this.aiStates))); // 
        }

        for (let i = 0; i < 3500; i ++) {
            this.foodBlobs.push(new Food(this));
        }
        
    }

    update() {
        this.grid.update();
        this.player.update();

        this.camX = this.player.x + this.gameWidth/2;
        this.camY = this.player.y + this.gameHeight/2;

        this.blobs.forEach(blob => {
            blob.update();
        });

        this.foodBlobs.forEach(f => {
            f.update()
        });
    }

    draw(ctx) {
        this.grid.draw(ctx);
        this.player.draw(ctx);


        this.foodBlobs.forEach(f => {
            f.draw(ctx)
        });

        this.blobs.forEach(blob => {
            blob.draw(ctx)
        });

        

    }
}