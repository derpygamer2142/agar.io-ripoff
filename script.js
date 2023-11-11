import Game from "./game.js";

/*
wow such an amazing test
*/

const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

canv.width = window.innerWidth;
canv.height = window.innerHeight;
const WIDTH = canv.width;
const HEIGHT = canv.height;

let game = new Game(WIDTH,HEIGHT);

function runGame() {
    if (game.gameState == 0) {
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        ctx.fillStyle = "rgb(60,60,60)";
        ctx.fillRect(0,0,WIDTH,HEIGHT);

        game.update();
        game.draw(ctx);
    }
    else if (game.gameState == 1) {
        game = new Game(WIDTH,HEIGHT)
    }
}

setInterval(runGame,17);