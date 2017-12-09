function generateWinningNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

//firsher yates
function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
  
    return array;
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber)
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(number){
    if(number < 1 || number > 100 || isNaN(number)){
        throw "That is an invalid guess."
    }
    this.playersGuess = number;
    return this.checkGuess();
}

Game.prototype.checkGuess = function(){
    if(this.playersGuess === this.winningNumber){
        return "You Win!";
    }
    else if(this.pastGuesses.includes(this.playersGuess)){
        return "You have already guessed that number.";
    }
    else this.pastGuesses.push(this.playersGuess);
    if(this.pastGuesses.length === 5){
        return "You Lose.";
    }
    switch (true){
        case (this.difference() < 10):
            return `You're burning up!`;
        case (this.difference() < 25):
            return `You're lukewarm.`;
        case (this.difference() < 50):
            return `You're a bit chilly.`
        default: return `You're ice cold!`
    }
}

function newGame(){
    return new Game();
}


Game.prototype.provideHint = function (){
    var hintArray = [this.winningNumber];
    for(var i = 0; i < 2; i++){
        hintArray.push(generateWinningNumber())
    }
    return shuffle(hintArray);
}

// Version removes duplicate possibilty from hintArray but breaks testem.

// Game.prototype.provideHint = function (){
//     var hintArray = [this.winningNumber];
//     var hint = generateWinningNumber();
//     for(var i = 0; i < 2; i++){
//         while(hintArray.includes(hint)){
//             hint = generateWinningNumber();
//         }
//         hintArray.push(hint)
//     }
//     return shuffle(hintArray);
// }

