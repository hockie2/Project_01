// var board = document.querySelector('#right');

// var moles = [];
var gameplay = false;
//game elements///////////////////////////////
//9 squares hit buttons
function gameButtonStart(){
    var moleButton = document.querySelectorAll('.mole');
        // moles.push(moleButton);
        console.log(moles);
        for (var i=0; i<moleButton.length; i++){
            moleButton[i].addEventListener('click',moleHit);
        }
    }

//game start-reset button
var startReset = document.querySelector('button');
startReset.addEventListener('click', start);

//game start function
function start (){
    countDown();
    console.log('countdown starts');

        //reset moles
        moleRestart();

        //change start to reset button
        startReset.removeEventListener('click', start);
        startReset.innerHTML='RESET';
        startReset.addEventListener('click', reset);
    }

//game reset function
function reset (){
    console.log('RESET');
    countDown();
    moleRestart();
    //clear Game Over text
    document.querySelector('#win').style.visibility= 'hidden';
}


//scoreboard
var totalScore = 0;
function displayScoreboard(score){
var scoreboard = document.  getElementById("scoreboard").innerHTML = score;
}


//time board
var timeleft = 30;

function countDownReset(){}

function countDown(){
    timeleft=30;

    //at interval of 1 sec, do the following
    var timer = setInterval(function(){
    //get time display area on document, then display timeleft
    var timeDisplay = document.getElementById("countdown").innerHTML = timeleft;
    timeleft -= 1;
    // console.log(timeleft);

      //when time = 0, display time's up
      if(timeleft <= 0){
        clearInterval(timer);

        var text = document.getElementById("countdown");
        text.innerHTML = "Time's up!";
        text.style.fontSize='40px'
        text.style.lineHeight='.8';

        startReset.removeEventListener('click', start);
        document.querySelector('#win').style.visibility= 'visible';
        moleRestart();
        return gameplay = false;
    }
}, 1000);
}


//test
function test (){
    console.log('TEST');
}


// function randomMoleAppear(){
//     console.log('inside function');
//     var moleId = this.getAttribute('img');
//     this.setAttribute('src','img/mole-appear.png');
// }
// function moleDisappear(){
//     console.log('inside function');
//     var moleId = this.getAttribute('img');
//     this.setAttribute('src','img/mole-disappear.png');
// }

function randomTimeoutTime(min, max){
    return Math.round(Math.random()* (max - min) + min)
}



//gameButton hit
function moleHit(){
    playAudio();
    // var time = randomTimeoutTime;
    if (gameplay === true){
        console.log('inside moleHit');

        var moleButton = document.querySelectorAll('.mole');

        var moleId = this.getAttribute('src');
        var moleButton = this.setAttribute('src','img/mole-hit.png');
    // for(timeleft !== 0){
    //mole disappear after certain time
    setTimeout(() => {
        this.setAttribute('src','img/mole-disappear.png');
        this.removeEventListener('click',moleHit);
    },500);
    totalScore+=1;
    console.log(totalScore);
    displayScoreboard(totalScore);

    setInterval(() => {
        this.setAttribute('src','img/mole-appear.png');
        this.addEventListener('click',moleHit);
    },randomTimeoutTime(1,5)*1000);
}
}
// }

function playAudio() {
    var audio = document.getElementById('myAudio');
    audio.play();
} ;


function moleRestart(){
    totalScore=0;
    displayScoreboard(totalScore);

    var moleButton = document.querySelectorAll('.mole');
    // console.log(this.moleButton);

    //reset - assign disappear to every moleButton
    for (var i=0; i<moleButton.length; i++){
        console.log('inside mole disappears');
        // var moleId = moleButton[i].getAttribute('src');

        moleButton[i].setAttribute('src','img/mole-disappear.png');
        moleButton[i].removeEventListener('click',moleHit);

    //all moles appear after 1 sec
    setTimeout(function(){
        for (var i=0; i<moleButton.length; i++){
            moleButton[i].setAttribute('src','img/mole-appear.png');
            moleButton[i].addEventListener('click',moleHit);
        }
    },1000)

    //all moles disappear after 3 sec
    setTimeout(function(){
        for (var i=0; i<moleButton.length; i++){
            moleButton[i].setAttribute('src','img/mole-disappear.png');
            moleButton[i].removeEventListener('click',moleHit);
            // console.log(i);
        }
    },randomTimeoutTime(3,6)*1000)

    //random mole appear
    setInterval(function(){
        for (var i=0; i<moleButton.length; i++){
            moleButton[i].setAttribute('src','img/mole-appear.png');
            moleButton[i].addEventListener('click',moleHit);
        }
    },randomTimeoutTime(3,6)*1000)

}
return gameplay = true;
}






//game images
    //moleAppear img
    //moleDisappear img
    //background img


//reset game
    //score = 0
    // var reset = function(){
    //     scoreboard = 0;
    //     return scoreboard;
    // }


// game starts
    //button hidden after clicked
    //game starts 1sec after start button hit
    //timing starts counting down from 30 to 0
    //mole appears at random square, at random interval, image change to moleAppear
    //square becomes clickable



    //mole disappears when clicked, image change to moleDisappear
        //square becomes unclickable
        //score + 1
    //else mole disappears after random timing
        //square becomes unclickable



//game ends
    //timing become 0
        //update timeBoard
    //button appears
        //add event listener
        //when clicked reset() game
