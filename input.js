export default class Input {
    constructor(game) {
        this.game = game;

        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;
        this.initInput();
        this.scrollX = 0
        this.scrollY
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


        document.addEventListener("wheel", e => {
            if (e.deltaY > 0) {
                this.game.camZoom *= 1/1.1
            }
            else if (e.deltaY < 0) {
                this.game.camZoom *= 1.1
            }
            console.log(3 * (this.game.player.r/25))

            if (this.game.camZoom <= 1/(this.game.player.r/25)) {
                this.game.camZoom = 1/(this.game.player.r/25)
            }
            else if (this.game.camZoom >= 2) {
                this.game.camZoom = 2
            }
        });


    }
}