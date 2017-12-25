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


//// jQuery /////////

$(function(){
    var game = newGame();
    function disabled(bool){
        $('#submit').prop('disabled', bool);
        $('#hint').prop('disabled', bool);
    }
    function penguin(message){
        $('#textboxR').html(message)
        $('#rightChat').fadeIn(1200).delay(2000).fadeOut(1200);
        $('#textboxR').fadeIn(1250).delay(1950).fadeOut(1200);
    }
    function dragon(message){
        $('#textboxL').html(message)
        $('#leftChat').fadeIn(1200).delay(2000).fadeOut(1200);
        $('#textboxL').fadeIn(1250).delay(1950).fadeOut(1200);
    }
    function submit(){
        var guess = game.playersGuessSubmission($('#player-input').val())
        $('#player-input').val("")
        if(guess !== "You have already guessed that number."){
            $('li').each(function(){
                if($(this).text() === '-'){
                    $(this).text(game.playersGuess);
                    return false;
                }
            })
        }
        
        if(Number(game.difference()) >= 25){
            if(guess = "You Win!"){
                penguin(guess);
                disabled(true);
            }
            else if(guess === "You Lose."){
                penguin(guess + " Press the reset button to play again!");
                disabled(true);
            }
            else if(game.isLower()){
                penguin(guess + " Guess higher!")
            }
            else penguin(guess + " Guess lower!")
        }
        else{
            if(guess = "You Win!"){
                dragon(guess);
                disabled(true);
            }
            else if(guess === "You Lose."){
                dragon(guess + " Press the reset button to play again!");
                disabled(true);
            }
            else if(game.isLower()){
                dragon(guess + " Guess higher!")
            }
            else dragon(guess + " Guess lower!")
        }
        
    }
    
    $('#submit').on('click', submit);
    
    $('#player-input').on('keypress', function(event){
        if(event.which === 13){
            submit();
        }
    })

    $('#reset').on('click', function(){
        game = newGame();
        $('li').each(function(){
            $(this).text('-');
        })
        disabled(false)
    })

    $('#hint').on('click', function(){
        dragon("Pick a number: " + game.provideHint().join(",  ") + '.');
    })

});