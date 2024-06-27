let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newgamebtn = document.querySelector("#new");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");



let turn0 = true;
let count=0;
const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = ()=>{
        turn0=true;
        count=0;
        enableBoxes();
        msgcontainer.classList.add("hide");
    }


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = "true";
        count++;

        let isWinner = checkwinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
    })

})

const gameDraw = ()=>{
    msg.innerText = "game is draw";
    msgcontainer.classList.remove("hide");
    disableBoxes();
};


const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};


const showWinner = (winner) => {
    msg.innerText = `congratulations, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkwinner = () => {
    for (pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner", pos1val);
                showWinner(pos1val);
                return true;
            }
        }
    }
}

resetButton.addEventListener("click", resetGame);

newgamebtn.addEventListener("click", resetGame);