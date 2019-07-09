var gameplay = false;

/////////////////////////////////////////////////////////////////////////////////
//6 moles hit buttons
var moleButton = document.querySelectorAll('.mole');

function moleButtonStart(){
    for (var i=0; i<moleButton.length; i++){
        this.addEventListener('click',moleHit);
    }
}

/////////////////////////////////////////////////////////////////////////////////
//game start-reset button
var startReset = document.querySelector('button');
startReset.addEventListener('click', start);

//number of times reset button hit during game
var resetNumTime = 0;

/////////////////////////////////////////////////////////////////////////////////
//game start function
function start (){
    audioClick();

    //reset moles
    moleRestart();

    countDown();
    // console.log('countdown starts');

    resetNumTime++;

    //change start to reset button
    startReset.removeEventListener('click', start);
    startReset.innerHTML='RESET';
    startReset.addEventListener('click', reset);

    return gameplay = true;
    }

/////////////////////////////////////////////////////////////////////////////////
//game reset function
function reset (){
    // console.log('RESET');
    audioClick();

    moleRestart();

    countDown();
    resetNumTime++;

    //clear Game Over text
    // document.querySelector('#win').style.visibility= 'hidden';
}

/////////////////////////////////////////////////////////////////////////////////
//scoreboard
var totalScore = 0;
var highScore = 0;
function displayScoreboard(score){
var scoreboard = document.getElementById("scoreboard").innerHTML = score;
    // if (timeleft===0){
    if (score >= highScore){
        highScore = score;
    }
// }
}

/////////////////////////////////////////////////////////////////////////////////
//time board
var timeleft = 30;

//countdown system
function countDown(){
    timeleft=30;

    if(resetNumTime === 0){     //so that won't keep adding interval if press reset multiple times during game

    //at interval of 1 sec, do the following
    var timer = setInterval(function(){
    //get time display area on document, then display timeleft
    var timeDisplay = document.getElementById("countdownText").innerHTML = timeleft;
    timeleft -= 1;
    // console.log(timeleft);


      //when time = 0, display time's up
      if(timeleft <= 0){
        clearInterval(timer);

        //reset Reset-button hit number of times back to zero
        resetNumTime=0;

        //update scoreboard
        var text = document.getElementById("countdownText");
        text.innerHTML = "Time's up!";
        text.style.fontSize='80%'
        text.style.lineHeight='.8';

        //update highscore
        var highscore = document.getElementById("highscoreNum").innerHTML = highScore;

        //update game over text
        var gameStart = document.querySelector('#win');
        gameStart.style.visibility= 'visible';
        gameStart.innerHTML = "Game Over!";

        startReset.removeEventListener('click', start);
        document.querySelector('#win').style.visibility= 'visible';
        return gameplay = false;
    }
}, 1000);
}
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

/////////////////////////////////////////////////////////////////////////////////
function randomTimeoutTime(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

/////////////////////////////////////////////////////////////////////////////////
//gameButton hit
function moleHit(){

    //play audio
    audioHit();

    // var time = randomTimeoutTime;
    if (gameplay === true){
        console.log('inside moleHit');

        this.setAttribute('src','img/mole-hit.png');
        this.removeEventListener('click',moleHit);

        //mole disappear half a second after hit
        setTimeout(() => {
            this.setAttribute('src','img/mole-disappear.png');
            this.removeEventListener('click',moleHit);
        },500);

        totalScore+=1;
        // console.log(totalScore);
        displayScoreboard(totalScore);


            moleAppearDisappear();

    }
}

/////////////////////////////////////////////////////////////////////////////////
function moleAppearDisappear(){


if(resetNumTime === 0){

    var moleAppear =  moleButton.forEach((img) => {


    //random time to appear
    if (img.getAttribute('src') === 'img/mole-disappear.png'){


// setTimeout(function(){
        var appear = setInterval(function(){
            img.setAttribute('src','img/mole-appear.png');
            img.addEventListener('click',moleHit);

            if (timeleft === 0){
                clearInterval(appear);
                img.setAttribute('src','img/mole-disappear.png');
            }

        }, (randomTimeoutTime(3,6)*1000));

// },5000)


    }

   //random time to disappear
   if (img.getAttribute('src') === 'img/mole-appear.png'){

// setTimeout(function(){

        var disappear = setInterval(function(){
            img.setAttribute('src','img/mole-disappear.png');
            img.removeEventListener('click',moleHit);

            if (timeleft === 0){
                clearInterval(disappear);
                img.setAttribute('src','img/mole-disappear.png');
            }

        }, (randomTimeoutTime(3,6)*1000))

    // },5000)
    }

})

}
}
/////////////////////////////////////////////////////////////////////////////////
function moleRestart(){
    totalScore=0;
    displayScoreboard(totalScore);
    gameplay = true;

    //add Game Start words
    var gameStart = document.querySelector('#win');
    gameStart.style.visibility= 'visible';
    gameStart.innerHTML = "Start!";
    setTimeout(function() {
        gameStart.style.visibility= 'hidden';
    }, 1500);

    //restart scoreboard style
        var text = document.getElementById("countdownText");
        text.innerHTML='30';
        text.style.fontSize='100%';
        text.style.lineHeight='.8';


    //all moles disappear
        var moleDisappear =  moleButton.forEach((img) => {
            img.setAttribute('src','img/mole-disappear.png');
            img.removeEventListener('click',moleHit);
        })

    // //all moles disappear after 3 sec
    // setTimeout(() => {
    //     for (var i=0; i<moleButton.length; i++){
    //         moleButton[i].setAttribute('src','img/mole-disappear.png');
    //         moleButton[i].removeEventListener('click',moleHit);
    //         // console.log(i);
    //     }
    // },2000)

moleAppearDisappear();

}
/////////////////////////////////////////////////////////////////////////////////

function audioHit() {
    var audio = document.getElementById('audioHit');
    audio.play();
};

function audioClick() {
    var audio = document.getElementById('audioClick');
    audio.play();
};

// function moleAppear(){

//     //mole appear random timing
//     var moleAppear =  moleButton.forEach((img, index) => {
//         var interval = setInterval(function(){
//             img.setAttribute('src','img/mole-appear.png');
//             img.addEventListener('click',moleHit);

//             if (timeleft === 0){
//                 clearInterval(interval);
//             }

//         },(randomTimeoutTime(1,4)*1000));
//     })
// }

// function moleDisappear(){
//     var moleButton = document.querySelectorAll('.mole');

//     //mole disappear random timing
//     var moleDisappear = moleButton.forEach((img, index) => {
//         var interval = setInterval(function(){
//             img.setAttribute('src','img/mole-disappear.png');
//             img.removeEventListener('click',moleHit);

//             if (timeleft === 0){
//                 clearInterval(interval);
//             }

//         },(randomTimeoutTime(2,6)*1000));
//     })
// }




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
