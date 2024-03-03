const boxes = document.querySelectorAll(".box");
const btn = document.querySelector(".btn");
const  PlayerInfo = document.querySelector(".current-player");


let currentPlayer;
let gameGrid ; 

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function init()
{
    currentPlayer = "X"
    gameGrid = ["","", "", "", "", "", "", "", "", ];
    boxes.forEach((box , index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"; 
        boxes[index].classList.remove("win");
        // one more thing is missing
    })
    btn.classList.remove("active");
    PlayerInfo.innerText = `Current Player: ${currentPlayer}`
} 
init();

boxes.forEach((box, index) =>
{
    box.addEventListener("click" , ()=>{
        handleClick(index);
    })
});
function swapTurn(){
    // This checks what turn is now (if now is X)
    if (currentPlayer === "X") 
    {   
        // Changes turn to 0
        currentPlayer = "O";
    }
    else{
        // Changes turn to x
        currentPlayer = "X";
    }
    // Updating the UI
    PlayerInfo.innerHTML = `Current Player: ${currentPlayer}`;
}
function handleClick(index){
    if(gameGrid[index] === "")
    {
        boxes[index].innerHTML = currentPlayer;
        // On filled box remove the cursor pointer property;
        boxes[index].style.pointerEvents = "none";
        gameGrid[index] = currentPlayer;
        // Now swapping the turn
        swapTurn();
        // Checking if GameOver:
        isGameOver();
    }
    
}


// New game button is calling the init function as creating new game:
btn.addEventListener("click" , ()=>{
    init();
})

function isGameOver(){
    let answer = "";
    winningPositions.forEach((position) => {
       if(  (gameGrid[position[0]] !== "" || gameGrid[position[1]]  !== "" || gameGrid[position[2]] !== "")  
        &&
       (gameGrid[position[0]] ===  gameGrid[position[1]] && gameGrid[position[1]] ===  gameGrid[position[2]])
       )
        {
            if(gameGrid[position[0]] === 'X')
                answer = "X";
            else answer = "O";

            // Disabling the pointer events:
            boxes.forEach((box) => {box.style.pointerEvents = "none"});

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }   
    });
    if(answer !== "")
        {
            PlayerInfo.innerText = `Winner - ${currentPlayer}`;
            btn.classList.add("active");
            return;
    }

    // Here is not winner yet Check for tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        PlayerInfo.textContent = "Game Tied !";
        btn.classList.add("active");
    }
}