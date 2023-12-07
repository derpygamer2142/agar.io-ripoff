export default class Usernames {
    constructor(game) {
        this.utils = game.utils
        this.names = [
            "bob",
            "your mother",
            "the missile",
            "something rude",
            "jeb",
            "literally 1984",
            "Xx_EdgyUsername_xX",
            "TurboWarp Dango",
            "control-r to team",
            "alt-f4 to team",
            "EngineerWalker",
            "derpygamer2142",
            "the fitness gram pacer test",
            "saneburrito-2000",
            "icecream",
            "fenixio",
            "3",
            "MismanagedDemolitionist",
            "steve jobs",
            "joe",
            "edhbfekijuwuej",
            "fuhyru",
            "nickname",
            "a nickname",
            "🤓",
            "Steve",
            "t0ttalyr3alh@ck3rm@n99",
            "ralsei from deltarune",
            "mercedes benz",
            "pls don't kill",
            "Meowy",
            "silly",
            "agar.io",
            "https://bit.ly/urmomhehehe",
            "python >>>>> js",
            "js >>>>> python",
            "THE C PROGRAMMING LANGUAGE",
            "unique username",
            "test",
            "username",
            "Type error: 45:28",
            "https://app.meower.org",
            "insanetaco2000",
            "./usernames.js",
            "not a furry",
            "a furry",
            "https://github.com/derpygamer2142/agar.io-ripoff",
            "the developer",
            "average linux user",
            "your mother"
        ]
    }
    randName() {
        return this.utils.randItem(this.names);
    }
}