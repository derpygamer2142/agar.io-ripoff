export default class Blob {
    constructor(game,ai) {
        this.game = game;

        this.collisions = this.game.collisions;
        this.utils = this.game.utils;

        this.x = (Math.random() - 0.5) * 40000;
        this.y = (Math.random() - 0.5) * 40000;
        this.r = 25 + (Math.random() * 15);

        this.targetX = this.x + ((Math.random()-0.5) * 2000);
        this.targetY = this.y + ((Math.random()-0.5) * 2000);

        this.color = "red";
        this.ai = ai;
        this.direction = Math.random() * 360;

        this.deleted = false;
    }

    update() {
        if (!this.deleted) {

            switch (this.ai) {
                case "search":
                    
                    if (this.game.foodBlobs.length > 0) {
                        let min = Infinity
                        let obj = null
                        this.game.foodBlobs.forEach(f => {
                            let dist = this.utils.dist(this.x,this.y,f.x,f.y);
                            if (dist <= min) {
                                min = dist;
                                obj = f;
                            }
                        });

                        let calcX = obj.x - this.x;
                        let calcY = obj.y - this.y;
                        this.direction = (Math.atan2(calcX,calcY) * (180/Math.PI))
        
                        this.x += Math.sin(this.direction * (Math.PI / 180))
                        this.y += Math.cos(this.direction * (Math.PI / 180))
                    }
                    else {
                        this.ai = this.utils.randItem(this.game.aiStates);
                        console.log("no blobs")
                        break;
                    }




                case "wander":
                    this.color = "purple"
                    if (Math.round(Math.random() * 15)) {
                        this.direction += (Math.random()-0.5)*5;
                    }

                
                    this.x += Math.sin(this.direction * (Math.PI / 180))
                    this.y += Math.cos(this.direction * (Math.PI / 180))
                    break;
                    
                
                case "afk":
                    this.color = "blue"
                    /*
                    this.x += Math.sin(this.direction * (Math.PI / 180))
                    this.y += Math.cos(this.direction * (Math.PI / 180))
                    */
                    if (Math.round(this.utils.random(0,750) == 1)) {
                        this.ai = this.utils.randItem(this.game.aiStates);
                    }
                    
                break;
                
                case "follow":
                    this.color = "red"
                    if (this.utils.dist(this.x,this.y,this.targetX,this.targetY) <= 15) {
                        if (Math.round(Math.random * 5) == 1) {
                            this.targetX = this.x + ((Math.random()-0.5) * 2000);
                            this.targetY = this.y + ((Math.random()-0.5) * 2000);
                        }
                    }
                    else {
                        let calcX = this.targetX - this.x;
                        let calcY = this.targetY - this.y;
                        this.direction = (Math.atan2(calcX,calcY) * (180/Math.PI))

                        this.x += Math.sin(this.direction * (Math.PI / 180)) // maybe i should just use radians this is annoying
                        this.y += Math.cos(this.direction * (Math.PI / 180))
                    }
                    break;

            
            }

            let rand = Math.round(this.utils.random(0,1000))
            if (rand == 1) {
                this.ai = this.utils.randItem(this.game.aiStates);
            }

            
            if (this.collisions.circleCircle(this.game.player,this)) {
                this.color = "green" // this should not work, yet it does.
            }
            


        }
    }

    draw(ctx) {
        if (!this.deleted) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            let calcX = this.game.camX - this.x
            let calcY = this.game.camY - this.y
            ctx.arc(calcX, calcY, this.r, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.font = "12px comic sans"
            ctx.fillText(this.ai,calcX,calcY)
        }

        
    }
}