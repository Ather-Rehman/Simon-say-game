let h2 = document.querySelector("h2");
let boxs = document.querySelectorAll(".box") ;
let body = document.querySelector("body");
let level = 0;
let started = false;
let string = ["red","purple", "yellow", "blue"]
let gameseq = [];
let userseq = [];
let score = []; // Tracks the Highest(last) level of every game.

document.addEventListener("keypress", function() {
    if (started == false){
        started = true;
        levelup();
    }
})

function levelup (){
    level++;
    h2.innerText = `Level ${level}`
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = string[randomIdx];
    let randomBox = document.querySelector(`.${randomColor}`);
    flash(randomBox);
    gameseq.push(randomColor);
    userseq = [];
   }

function flash(btn){
    btn.style.backgroundColor = "white";
    setTimeout(function(){
    btn.style.backgroundColor = ""; 
    }, 250); 
}

for(let box of boxs){
    box.addEventListener("click" ,press)
}

function press(){
  let boxClicked = this;
  flash(boxClicked);
  let usercolor = boxClicked.getAttribute("id");
  userseq.push(usercolor);
 checkAns(userseq.length - 1);
}

function checkAns(idx){
if(gameseq[idx] == userseq[idx]){
   if(gameseq.length == userseq.length){
     setTimeout(levelup , 1000 );
   }
   } else {
    score.push(level);
    flashBody ();
    h2.innerHTML = `<h2> GAME OVER!</h2> </br>Your score was ${level}. </br> Press any key to restart`;   
    printHN();  // Prints highest score(highest number in Array 'score') on page.
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
    return score; 
   }   
}

function flashBody (){
    body.style.backgroundColor = "red";
    setTimeout(function(){
         body.style.backgroundColor = "white"; 
     }, 250); 
}

let maxN = 0;
let hsh2 = document.createElement("h2");
body.prepend(hsh2);
hsh2.classList.add("HS");

function printHN(){
    for(let i=0; i<score.length; i++){
     if(score[i] > maxN){
         maxN = score[i]
     }
    }
    hsh2.innerHTML = `Your Highest score = <b>${maxN}<b/>`  
 }



