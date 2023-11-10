export default class Blob {
    constructor(game,ai) {
        this.game = game;

        this.collisions = this.game.collisions;
        this.utils = this.game.utils;

        this.x = (Math.random() - 0.5) * 3000;
        this.y = (Math.random() - 0.5) * 3000;
        this.r = 25 + (Math.random() * 15);

        this.targetX = 0//this.x + ((Math.random()-0.5) * 2000);
        this.targetY = 0//this.y + ((Math.random()-0.5) * 2000);

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
                    if (Math.round(Math.random() * 15) == 1) {
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

                this.game.blobManager.compareBlobs(this,this.game.player);
                
                
                /*
                let collisionChecks = this.game.blobs;
                collisionChecks = collisionChecks.concat(this.game.foodBlobs);

                collisionChecks = collisionChecks.filter(b => b.r + this.r < this.game.utils.dist(this.x,this.y,b.x,b.y))
                collisionChecks.forEach(b => {
                    if (this.collisions.circleCircle(this,b)) {
                        if (this.r > b.r) {
                            b.deleted = true;
                        }
                        else {
                            this.deleted = true;
                        }
                    }
                });
                */

                
                let testDist = this.game.utils.dist(this.x,this.y,this.game.player.x,this.game.player.y);

                if (testDist <= 5000) {
                    this.game.blobs.forEach(b2 => {
                        if (!this.delted && !b2 == this) {
                            this.game.blobManager.compareBlobs(this,b2);
                            
                            
                        }
                    });

                    if (!this.deleted) {
                        this.game.foodBlobs.forEach(b2 => {
                            if (!this.delted) {
                                this.game.blobManager.compareBlobs(this,b2);
                            }
                        });
                    }
                }
                

        }
    }

    draw(ctx) {
        if (!this.deleted) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            let calcX = this.game.camX - this.x;
            let calcY = this.game.camY - this.y;
            ctx.arc(calcX, calcY, this.r, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.font = "12px comic sans"
            ctx.fillText(this.ai,calcX,calcY)
        }


    }
}