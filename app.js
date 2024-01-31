let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;

let btns=["yellow", "red", "purple", "green"];
let highestScore=0;

let h2=document.querySelector("h2");
let highScore=document.querySelector("h3");
highScore.innerText=`HighestScore : ${highestScore}`;

document.addEventListener("keypress",function (){
    if(started===false){
        levelUp();
        started=true;
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    }, 250); 
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function (){
        btn.classList.remove("userFlash");
    }, 250); 
}

function levelUp(){
    level++;
    h2.innerText=`Level ${level}`;
    userSeq=[];

    let ranIdx= Math.floor(Math.random()*4);
    let ranClr=btns[ranIdx];
    
    let ranBtn= document.querySelector(`#${ranClr}`);
    gameFlash(ranBtn);
    gameSeq.push(ranClr);
}

function checkAns(idx){

    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML=`Game over! Your score was <b>${level}</b> Press any key to restart`;
        document.querySelector("body").classList.add("gameOver");
        setTimeout(()=>{
            document.querySelector("body").classList.remove("gameOver");
        },150);
        if(highestScore<level){
            highestScore=level;
            highScore.innerText=`HighestScore : ${highestScore}`;
        }
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    let userColor= btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns= document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
}
