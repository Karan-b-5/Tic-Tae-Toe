const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.new-game-btn');

// Store current Player
let currentPlayer;

// All the Possible combinations to win
const winningPositions = [
    // horizontal
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    // vertical
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8], 
    // diagonal
    [0, 4, 8],
    [2, 4, 6]
]
// will store the X/O at particular positions
let gameGrid;

// Initialize the game
function initGame(){
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];   // initially all boxes are empty...

    // Empty the boxes on UI (as this function will also be called when New Game is clicked, so we need to empty the previous game data from UI)
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";  // again make the box clickable

        // box.classList = `box box-${index + 1}`;  // reinitialise CSS classes of boxes (i.e. basically to remove win class)
        // box.classList.remove("win");
        if(box.classList.contains("win"))
            box.classList.remove("win");
    });

    gameInfo.innerText = `Current Player - ${currentPlayer.toUpperCase()}`;
    newGameBtn.classList.remove("active");
}

initGame();

function swapTurn(){
    if(currentPlayer === "X")
        currentPlayer = "O";
    else
        currentPlayer = "X";
    
    // Update on UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

function checkGameOver(){
    let winner = "";

    // check if any winning combination is true for X/O
    winningPositions.forEach((position) => {
        // all three position should be non empty and all three should be equal...
        if(gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!==""
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){

            winner = gameGrid[position[0]] === 'X' ? 'X' : 'O';

            // disable click on other boxes (as after winning other boxes if clicked then multiple win position can be formed)
            boxes.forEach(box => {
                box.style.pointerEvents = "none";
            });

            // Make win position box color change to green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    // checks if we get the winner
    if(winner != ""){
        gameInfo.innerText = `🥳  Winner - ${winner.toUpperCase()}  🥳`;
        newGameBtn.classList.add("active");
        return;
    }

    // checks if its a draw (i.e. all boxes are filled and no winner found)
    let allBoxesFilled = true;  // we can also initialise fillCount to 0 and increment it for the boxes which are filled and check if it's == 9 or gameGrid.size then also DRAW...
    gameGrid.forEach((box) => {
        if(box === ""){
            allBoxesFilled = false;
        }
    });

    if(allBoxesFilled){
        gameInfo.innerText = `It's a Draw`;
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    // if clicked box if empty (i.e. has no text in it), then : make it unclickable, put in value as X/0 as per current player, Change player, check if any one wins
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"; //Make the box unClickable (i.e. to remove the cursor pointer from it).
        //Swap user turn
        swapTurn();
        //Check if any one wins or not ... OR there is a tie.
        checkGameOver();

        //DIY : we should check if anyone wins or not before swap turn...
    }
    // Once filled the box becomes unclickable as now it has data filled in it and we only run the code if it's empty
}



// ------------ Adding Event Listeners 

boxes.forEach((box, index) => {
    // pass index to know which box has been clicked
    // through index we can also find box number like box1, box2, box9 (in boxes and gameGrid variables) etc instead of using event.target
    box.addEventListener('click', () => {
        handleClick(index);
    });
})

// Reinitialise game to new (i.e. call initGame) when we click new game button
newGameBtn.addEventListener('click', initGame);

// Here on click we also remove the win class if present in any of box in boxes and then call initGame OR in initGame we can check if box contains win class then remove it (if we don't add box1, box2, box3 classes and instead add border-bottom and border-right classes...)