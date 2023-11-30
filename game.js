import Grid from "./grid.js";
import Player from "./player.js";
import Input from "./input.js";
import Blob from "./blobs.js";
import Collisions from "./collisions.js";
import Utils from "./utilsnstuff.js";
import Food from "./food.js";
import BlobManager from "./blobCollisionManager.js";

export default class Game {
    constructor(WIDTH, HEIGHT) {
        this.gameWidth = WIDTH;
        this.gameHeight = HEIGHT;

        
        this.camX = 0;
        this.camY = 0;

        this.collisions = new Collisions();
        this.utils = new Utils();

        this.blobManager = new BlobManager(this);

        this.grid = new Grid(this);
        this.spawnDist = this.grid.gridWidth
        this.input = new Input(this);
        this.player = new Player(this);


        this.camX = this.player.x;
        this.camY = this.player.y;
        this.camXOff = this.gameWidth/2
        this.camYOff = this.gameHeight/2
        this.camZoom = 1

        this.aiStates = ["follow","afk","wander","search", "agressive","spikey"];
        this.blobs = [];
        this.foodBlobs = [];

        for (let i = 0; i < 200; i ++) {
            this.blobs.push(new Blob(this,this.utils.randItem(this.aiStates))); // 
        }

        for (let i = 0; i < 3500; i ++) {
            this.foodBlobs.push(new Food(this));
        }
    }

    update() {
        this.grid.update();
        this.player.update();
        // this.camZoom = 25/this.player.r
        this.camX = this.player.x
        this.camY = this.player.y
        this.camXOff = this.gameWidth/2
        this.camYOff = this.gameHeight/2

        this.blobs.forEach(blob => {
            blob.update();
        });

        this.foodBlobs.forEach(f => {
            f.update()
        });

        // this.blobManager.checkForBlobCollisions();
        this.blobs = this.blobs.filter(b => !b.deleted);
        this.foodBlobs = this.foodBlobs.filter(b => !b.deleted);
        //console.log(this.foodBlobs.length)
    }

    draw(ctx) {
        this.grid.draw(ctx);
        this.player.draw(ctx);
        this.blobs.sort((a,b) => a.r - b.r)
        this.foodBlobs.sort((a,b) => a.r - b.r) //why tf does this break everything


        this.foodBlobs.forEach(f => {
            f.draw(ctx)
        });

        this.blobs.forEach(blob => {
            blob.draw(ctx)
        });

        

    }

    newBlob() {
        this.blobs.push(new Blob(this,this.utils.randItem(this.aiStates)));
    }

    newFood() {
        this.foodBlobs.push(new Food(this));
    }

    start(name) {

        this.gameState = 0
        this.player.name = name
    }

}