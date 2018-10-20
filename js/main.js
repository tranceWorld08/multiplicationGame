var isPlaying = false;
var score;
var action;
var timeremaining;
var correctAnsr;

document.getElementById('startreset').onclick=
function(){
    if(isPlaying){
        location.reload();//reload page
    } else{
        isPlaying = true;
        score = 0;
        timeremaining = 60;

        document.getElementById('scoreValue').innerHTML=score;
        document.getElementById('startreset').innerHTML = "Reset Game";

        show('timeremaining');
        hide('gameOver');
        
        startCountdown();
        generateQA();

    }
}

function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById('timeremainingval').innerHTML=timeremaining;
        
        if(timeremaining === 0){
            stopCountdown();
            document.getElementById('gameOver').innerHTML = '<p>Game Over</p><p>Your Score is ' + score + '.</p>';
            document.getElementById('startreset').innerHTML = 'Start Game';

            show('gameOver');
            hide('timeremaining');
            hide('correct');
            hide('wrong');

            isPlaying = false;
        }
    }, 1000);
}

function stopCountdown(){
    clearInterval(action);
}

function hide(id){
    document.getElementById(id).style.display = 'none';
}

function show(id){
    document.getElementById(id).style.display = 'block';
}

function generateQA(){
    var x = Math.round(Math.random() * 9) + 1;
    var y = Math.round(Math.random() * 9) + 1;
    correctAnsr = x * y;
    document.getElementById('question').innerHTML = x + " x " + y;

    //RANDOM BOX TO PLACE CORRECT ANSWER
    var correctPos = Math.round(Math.random() * 3) + 1;
    var answerBox = 'box' + correctPos;
    document.getElementById(answerBox).innerHTML = correctAnsr;

    //MAKE SURE WRONG ANSWERS DON'T REPEAT BY CREATING ARRAY OF ALL ANSWERS(WRONG & RIGHT)
    var answers = [ correctAnsr];

    //CYCLE THROUGH BOXES AND PLACE WRONG ANSWERS
    for(var i = 1; i <= 4; i++){
        var wrongAnsr;
        //KEEP GENERATING A WRONG ANSWER IF CORRECT ANSWER IS THE SAME
        do{ 
            wrongAnsr = Math.round(Math.random() * 99) + 1;
        } while( answers.indexOf(wrongAnsr) > -1);

        answers.push(wrongAnsr);
        var currentBox = document.getElementById("box" + i);
        if(currentBox.innerHTML != correctAnsr){
            currentBox.innerHTML = wrongAnsr;
        } else {
            continue;
        }
    }

    for(var j = 1; j <= 4; j++){
        document.getElementById('box'+ j).onclick = function(){

            if(isPlaying){
      
                if(this.innerHTML == correctAnsr){  
                    show('correct');
    
                    setTimeout(function(){ 
                        hide('correct'); 
                    },1500);
                    
                    score++;
                    document.getElementById('scoreValue').innerHTML = score;
    
                    generateQA();  
                } else {  
                    show('wrong');
    
                    setTimeout(function(){
                        hide('wrong');  
                    },1500);
    
                    generateQA();
                }
            }
        }
    }
}