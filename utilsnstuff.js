export default class Utils {
    dist(x1,y1,x2,y2) {
        return Math.sqrt( ((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)) )
    }

    random(num1,num2) {
        return Math.random() * (num2 - num1) + num1; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    }

    randItem(list) {
        return list[Math.round(this.random(0,list.length-1))]
    }

    dirToVector(dir) {
        let returnjson = {};
        returnjson.xv = Math.sin(dir * (Math.PI / 180));
        returnjson.yv = Math.cos(dir * (Math.PI / 180));
        return returnjson;
    }

    chooseWithWeights(data) {
        let weights = {}
        let total = 0
        Object.keys(data).forEach(e =>{
            total += data[e].w
        });
        Object.keys(data).forEach(e =>{
            weights[e] = (data[e].w/total)
        });
        let randval = Math.random()
        let heldAmount = 0;
        let heldOutput = null
        Object.keys(weights).forEach(k => {
            
        })
    }
}