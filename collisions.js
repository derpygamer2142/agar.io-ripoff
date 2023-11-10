export default class Collisions {
    circleCircle(circleA,circleB) {
        let dist = Math.sqrt(((circleB.x - circleA.x) * (circleB.x - circleA.x)) + ((circleB.y - circleA.y) * (circleB.y - circleA.y)))
        
        if (dist < circleA.r + circleB.r) {
            return true
        }
        return false

    }
}