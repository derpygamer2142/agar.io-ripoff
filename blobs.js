export default class Blob {
    constructor(game,ai) {
        this.game = game;

        this.collisions = this.game.collisions;
        this.utils = this.game.utils;

        this.x = (Math.random() - 0.5) * 8000;
        this.y = (Math.random() - 0.5) * 8000;
        this.r = 17.5 + (Math.random() * 65);

        this.targetX = this.x + ((Math.random()-0.5) * this.game.spawnDist);
        this.targetY = this.y + ((Math.random()-0.5) * this.game.spawnDist);

        this.color = "red";
        this.ai = ai;
        this.direction = Math.random() * 360;

        this.deleted = false;

        let v = this.utils.dirToVector(this.direction)
        this.xv = v.xv;
        this.yv = v.yv;
        this.type = "blob"
        
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
                        
                        let v = this.utils.dirToVector(this.direction)
                        this.xv = v.xv;
                        this.yv = v.yv;

                    }
                    else {
                        this.randomaAiState();
                        console.log("no blobs")
                        break;
                    }




                case "wander":
                    this.color = "purple"
                    if (Math.round(Math.random() * 15) == 1) {
                        this.direction += (Math.random()-0.5)*5;
                    }

                    let v = this.utils.dirToVector(this.direction)
                    this.xv = v.xv;
                    this.yv = v.yv;
                    break;
                    
                
                case "afk":
                    this.color = "blue"
                    /*
                    this.x += Math.sin(this.direction * (Math.PI / 180))
                    this.y += Math.cos(this.direction * (Math.PI / 180))
                    */
                    if (Math.round(this.utils.random(0,350) == 1)) {
                        this.randomaAiState()
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

                        let v = this.utils.dirToVector(this.direction)
                        this.xv = v.xv;
                        this.yv = v.yv;
                    }
                    break;

                

                case "agressive":
                    this.color = "red"
                    if (this.game.blobs.length > 0) {
                        let min = this.utils.dist(this.x,this.y,this.game.player.x,this.game.player.y)
                        let obj = this.game.player

                        if (obj.r > this.r && !(obj.ai == "spikey")) {
                            min = Infinity
                            obj = null
                        }
                        let possibleTargets = this.game.blobs;
                        possibleTargets = possibleTargets.filter(f => (f.r < this.r))
                        this.game.blobs.forEach(f => {
                            if (!(f == this)) {
                                let dist = this.utils.dist(this.x,this.y,f.x,f.y);
                                if (dist <= min) {
                                    min = dist;
                                    obj = f;
                                }
                            }
                        });

                        let calcX = obj.x - this.x;
                        let calcY = obj.y - this.y;
                        this.direction = (Math.atan2(calcX,calcY) * (180/Math.PI))
        
                        let v = this.utils.dirToVector(this.direction)
                        this.xv = v.xv;
                        this.yv = v.yv;

                    }
                    else {
                        this.randomaAiState()
                        console.log("no blobs")
                        break;
                    }

                case "spikey":
                    this.color == "rgb(19,252,3)"
                    break;
            
            }
                if (!(this.ai == "spikey")) {
                    let rand = Math.round(this.utils.random(0,1000))
                    if (rand == 1) {
                        this.randomaAiState()
                    }
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

                if (testDist <= 2000) {
                    this.game.blobs.forEach(b2 => {
                        if (!(b2 == this)) {
                            
                            //this.game.blobManager.compareBlobs(this,b2);
                            if (this.collisions.circleCircle(this,b2)) {
                                //console.log("bonk")
                                if (this.r > b2.r) {
                                    this.r += b2.r*0.1
                                    b2.deleted = true;
                                }
                                else {
                                    b2.r += b2.r*0.1
                                    this.deleted = true;
                                }
                            }
                            
                        }
                    });

                    if (!this.deleted) {
                        this.game.foodBlobs.forEach(b2 => {
                            if (!this.deleted) {
                                this.game.blobManager.compareBlobs(this,b2);
                            }
                        });
                    }
                }
                
            
            
            this.x += (50/this.r) * this.xv;
            this.y += (50/this.r) * this.yv;
        }
    }

    draw(ctx) {
        if (!this.deleted) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            let calcX = (this.game.camX - this.x)*this.game.camZoom;
            let calcY = (this.game.camY - this.y)*this.game.camZoom;
            calcX += this.game.camXOff
            calcY += this.game.camYOff
            ctx.arc(calcX, calcY, this.r*this.game.camZoom, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.font = `${12*this.game.camZoom}px comic sans`
            ctx.fillText(this.ai,calcX,calcY)
        }


    }

    randomaAiState() {
        if (this.ai == "spikey") {return;}
        this.ai = this.utils.randItem(this.game.aiStates);
            while (this.ai == "afk") {
                if (Math.random(this.utils.random(0,15) == 1)) {
                    break;
                }
                else {
                    this.ai = this.utils.randItem(this.game.aiStates);
                }
            }

    }
}