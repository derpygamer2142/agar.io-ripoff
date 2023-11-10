export default class Input {
    constructor(game) {
        this.game = game;

        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;
        this.initInput();
    }

    update() {

    }

    draw() {

    }

    initInput() {
        document.addEventListener("keydown", e => {
            this[e.key] = true;
        });
        
        document.addEventListener("keyup", e => {
            this[e.key] = false;
        });

        document.addEventListener("mousemove", e => {
            // console.log("mouse move")
        });


    }
}