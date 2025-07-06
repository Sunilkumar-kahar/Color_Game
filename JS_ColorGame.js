let targetColor = document.getElementById("targetColor");
let score = document.getElementById("score");
let timer = document.getElementById("timer");
let colorBoxContainer = document.getElementById("colorBoxContainer");
let gameContent = document.getElementById("gameContent");
let instructionDiv = document.getElementById("instructionDiv");
let btn = document.getElementById("new-game");
let cntrlBtn = document.getElementById("cntrlBtn");
let color;
let points;
let gameStatus = false;
let time;
let intervalId;
let colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "hotpink", "black", "white", "violet", "gray", "khaki", "lightskyblue", "cyan", "maroon"];
function setTargetColor(){
    let idx = Math.ceil((Math.random()*100)) % 16;
    return(colors[idx]);
}

function reArrangeColorArray(){
    let j;
    for(let i = 15; i > 0; i--){
        j = Math.floor(Math.random() * (15 + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
    }
}

function createColorBoxs(){
    reArrangeColorArray();
    for(let i=0; i < 16; i++){
        const divBox = document.createElement("div");
        divBox.className = "colorBox";
        colorBoxContainer.appendChild(divBox);
        divBox.style.backgroundColor = colors[i];
        divBox.addEventListener("click", function(){
            let txt = cntrlBtn.innerText;
            if(gameStatus == false || txt === "Resume")
                return;

            let choosenColor = divBox.style.backgroundColor;
            if(choosenColor === color){
                points++;
                setGameStats();
            }
        });
    }
}

function setGameStats(){
    colorBoxContainer.innerHTML = "";
    color = setTargetColor(colors);
    targetColor.innerText = "🎯Click On : " + color.toUpperCase();
    score.innerText = "🏆Score:" + points;
    createColorBoxs();
    gameStatus = true;
}

cntrlBtn.addEventListener("click",()=>{
    let txt = cntrlBtn.innerText;
    if(txt === "Pause"){
        clearInterval(intervalId);
        cntrlBtn.innerText = "Resume";

    }
    else{
        cntrlBtn.innerText = "Pause";
        setTimeInterval();
    }
});

function setTimeInterval(){
    if(intervalId)
        clearInterval(intervalId);
    intervalId = setInterval(()=>{
        time--;
        timer.innerText = "⏳Time Left:"+ time +" Sec";
        if(time == 0){
            clearInterval(intervalId);
            cntrlBtn.style.display = "none"
            //timer.innerText = "⏳Time Left:"+ time +" Sec";
            setTimeout(()=>{
                alert("Your Score is:"+points);
            }, 1);
            gameStatus = false;
        }
    }, 1000);
}

function startGame(){
    instructionDiv.style.display = "none";
    gameContent.style.display = "block";
    cntrlBtn.style.display = "inline-block";
    time = 20;
    points = 0;
    setGameStats();
    timer.innerText = "⏳Time Left:"+ time +" Sec";
    btn.innerText = "New Game";
    cntrlBtn.innerText = "Pause";
    setTimeInterval();
}