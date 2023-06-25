const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newBtnGame = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


//let create a fucntion to initialixze the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //initialize box with all css properties to remove green bg
        box.classList.remove("win");
    });
    newBtnGame.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position) => {
        //all 3 boxes should be non empty and exactly same
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            //check if answer is X
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "O";
            }
            //disable pointers
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            //now we know thw winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newBtnGame.classList.add("active");
        return;
    }

    //when it is tied which is no winner found
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    })

    //if full board is filled
    if (fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newBtnGame.classList.add("active");
    }

}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();

        //check for winner condition 
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newBtnGame.addEventListener("click", initGame);