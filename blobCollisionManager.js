export default class BlobManager {
    constructor(game) {
        this.game = game;
        this.collisons = this.game.collisions;
    }

    compareBlobs(blob1, blob2) {
        if (this.game.collisions.circleCircle(blob1,blob2)) {
            if (blob1.r > blob2.r) {
                blob1.r += blob2.r;
                blob2.deleted = true;
            }
            else if (blob2.r > blob1.r) {
                blob2.r += blob1.r;
                blob1.deleted = true;
                
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