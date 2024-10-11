const statusDisplay = document.querySelector("#game-status");
const cells = document.querySelectorAll("[data-cell]");
const resetButton = document.querySelector("#reset-btn");
let confettiInstance; // Declare the confetti instance but do not initialize it yet

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle click on a cell
function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = Array.from(cells).indexOf(clickedCell);

    if (board[cellIndex] !== "" || !gameActive) {
        return;
    }

    updateCell(clickedCell, cellIndex);
    checkResult();
}

// Update the clicked cell
function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Check game result (win or draw)
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        launchConfetti(); // Launch party popper effect
        return;
    }

    if (!board.includes("")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset game
// Reset game with loader
function resetGame() {
    // Show loader
    document.getElementById("loader").style.visibility = "visible";
    
    // Hide loader and reset the game after 4 seconds
    setTimeout(() => {
        // Hide the loader
        document.getElementById("loader").style.visibility = "hidden";
        
        // Reset game logic
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        statusDisplay.textContent = "Player X's turn";
        cells.forEach(cell => (cell.textContent = ""));
        
        // Clear confetti if it's running
        if (confettiInstance) {
            confettiInstance.clear();
        }
    }, 2000); // 2 seconds delay
}


// Launch confetti effect
function launchConfetti() {
    confettiInstance = new ConfettiGenerator({
        target: "confetti-canvas",
        max: 150,
        size: 1,
        animate: true,
        props: ["circle", "square", "triangle"],
        colors: [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]],
        clock: 25,
        rotate: true,
        start_from_edge: true,
        width: window.innerWidth,
        height: window.innerHeight
    });
    confettiInstance.render();
}

// Attach event listeners to each cell and reset button
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
