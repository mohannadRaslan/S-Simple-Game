var scores, roundScore, activePlayer, gamePlaying, previousRoll, winningScore;

initializingGame();

function initializingGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // first player
    gamePlaying = true;
    previousRoll = 0;
    winningScore = 100;
    
    document.querySelector('.first').style.display = 'none';
    document.querySelector('.second').style.display = 'none';
    
    document.querySelector('.final-score').value = "";
    
    document.querySelector('.final-score').disabled = false;

    for(var i=0;i<2;i++){
        var score = 'score-'+i;
        var current = 'current-'+i;
        document.getElementById(score).textContent = '0';
        document.getElementById(current).textContent = '0';
        document.querySelector('#name-'+i).textContent = 'Player' + i;
        document.querySelector('.player-'+i+'-panel').classList.remove('winner');
        document.querySelector('.player-'+i+'-panel').classList.remove('active');
    
    }
    document.querySelector('.player-0-panel').classList.add('active');
}

function changePlayer(){
    roundScore = 0;
    previousRoll = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.first').style.display = 'none';
    document.querySelector('.second').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        var firstDice = Math.floor(Math.random() * 6) + 1;
        var secondDice = Math.floor(Math.random() * 6) + 1;


        var diceImage = document.querySelector('.first');
        diceImage.style.display = 'block';
        diceImage.src = 'dice-' + firstDice + '.png';
        
        var diceImage = document.querySelector('.second');
        diceImage.style.display = 'block';
        diceImage.src = 'dice-' + secondDice + '.png';

        if(firstDice === 1 || secondDice === 1 || (previousRoll === firstDice && previousRoll === 6)){
            changePlayer();
        }else{
            totalDices = firstDice + secondDice;
            roundScore += totalDices;
            previousRoll = totalDices;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } 
    }else{
        alert('The game has been finished!\nPlease start a new game');
    }
    
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore;
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        
        document.querySelector('.final-score').disabled = true;
        
        if(scores[activePlayer] > winningScore) {
            document.querySelector('#name-'+activePlayer).textContent = 'Winner';
            document.querySelector('.first').style.display = 'active';
            document.querySelector('.second').style.display = 'active';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;

        }else{
            changePlayer();
        }
    }else{
        alert('The game has been finished!\nPlease start a new game');
    }
    
    
});

document.querySelector('.final-score').addEventListener('change', function(){
    var input = document.querySelector('.final-score').value;
    var positiveIntegers = /^\d*$/;
        
    if(input && positiveIntegers.test(input)){
        winningScore = input;
        console.log(input);
     }else{
         alert('Please try again to add FINAL SCORE. If you didn\'n add a Final Score, it will turned to 100!');
     }
})


document.querySelector('.btn-new').addEventListener('click', initializingGame);