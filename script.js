import Game from "./game.js";

/*
wow such an amazing test
*/

const canv = document.querySelector("canvas");
const form = document.querySelector("form")
const ctx = canv.getContext("2d");

canv.width = 0//;
canv.height = 0//window.innerHeight;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let game = new Game(WIDTH,HEIGHT);

function start(e) {
    e.preventDefault();
    const nameInputs = form.getElementsByTagName("input")
    let name = nameInputs[0].value

    form.removeChild(form.firstChild)
    form.removeChild(form.firstChild)
    form.removeChild(form.firstChild)
    canv.width = WIDTH
    canv.height = HEIGHT
    game.start(name)

}

form.onsubmit = start


/*
const nameInput = document.createElement("input");
        nameInput.setAttribute("id", "nameInput");
        nameInput.setAttribute("type", "text");
        nameInput.required = true;
        
        const enterNameHeader = document.createElement("h5");
        enterNameHeader.textContent = "Enter a name: ";

        const startBtn = document.createElement("button");
        startBtn.setAttribute("id", "startBtn");
        startBtn.textContent = "Start Game";

        form.appendChild(enterNameHeader);
        form.appendChild(nameInput);
        form.appendChild(startBtn);
*/


function runGame() {
    if (game.gameState == 0) {
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        ctx.fillStyle = "rgb(60,60,60)";
        ctx.fillRect(0,0,WIDTH,HEIGHT);

        game.update();
        game.draw(ctx);
    }
    else if (game.gameState == 1) {
        //game = new Game(WIDTH,HEIGHT)
    }
}

setInterval(runGame,17);