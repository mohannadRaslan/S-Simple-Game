var scores, roundScore, activePlayer, gamePlaying, previousRoll;

initializingGame();

function initializingGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // first player
    gamePlaying = true;
    previousRoll = 0;
    
    document.querySelector('.dice').style.display = 'none';


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
    document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        var dice = Math.floor(Math.random() * 6) + 1;

        var diceImage = document.querySelector('.dice');
        diceImage.style.display = 'block';
        diceImage.src = 'dice-' + dice + '.png';

        if(dice === 1 || (previousRoll === dice && previousRoll === 6)){
            changePlayer();
        }else{
            roundScore += dice;
            previousRoll = dice;
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

        if(scores[activePlayer] > 100) {
            document.querySelector('#name-'+activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'active';
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

document.querySelector('.btn-new').addEventListener('click', initializingGame);