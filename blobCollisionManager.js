export default class BlobManager {
    constructor(game) {
        this.game = game;
        this.collisons = this.game.collisions;
    }

    compareBlobs(blob1, blob2) {
        if (this.game.collisions.circleCircle(blob1,blob2)) {
            if (blob1.type == "food" || blob2.type == "food") {
                this.game.newFood()
            }
            if (blob1.type == "blob" || blob2.type == "blob") {
                this.game.newBlob()
            }
            if (blob1.r > blob2.r) {
                blob1.r += blob2.r*0.1;
                blob2.deleted = true;
                //console.log(blob1.type,blob2.type)
                
                return blob1
            }
            else if (blob2.r > blob1.r) {
                blob2.r += blob1.r*0.1;
                blob1.deleted = true;
                //console.log(blob1.type,blob2.type)
                
                
                return blob2
                
            }
            else {
                console.log("how tf")
            }
            
        }

    }

    checkForBlobCollisions() {
        // tehee long function name go brrrrr
        this.game.blobs.forEach(b1 => {

            this.game.blobs.forEach(b2 => {
                if (!b1 == b2) {
                    compareBlobs(b1,b2);
                    this.game.blobs.filter(b => !b.deleted) // not sure if js will update the foreach loop, hopefully this isn't a problem
                }
            });

            this.game.foodBlobs.forEach(b2 => {
                if (!b1 == b2) {
                    compareBlobs(b1,b2);
                    this.game.foodBlobs.filter(b => !b.deleted) // efficiency :sunglasses:
                }
            });

        });
        // this is ugly, inefficient, and generally bad

        // i was right, it's slow af
    }
}