document.addEventListener("DOMContentLoaded", function() {
    const ROWS = 6;
    const COLS = 7;
    let currentPlayer = "red";
    let board = createBoard();

    const boardElement = document.getElementById("board");
    const messageElement = document.getElementById("message"); // New message element
    const resetButton = document.getElementById("reset-btn");

    // Initialize the game
    renderBoard();
    
    // Event listener for resetting the game
    resetButton.addEventListener("click", function() {
        board = createBoard();
        currentPlayer = "red";
        renderBoard();
    });

    // Function to create an empty board
    function createBoard() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    }

    // Function to render the board
    function renderBoard() {
        boardElement.innerHTML = "";
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                if (cell === "red") {
                    cellElement.classList.add("red");
                } else if (cell === "yellow") {
                    cellElement.classList.add("yellow");
                }
                cellElement.addEventListener("click", () => handleMove(colIndex));
                boardElement.appendChild(cellElement);
            });
        });
    }

    // Function to handle player moves
    function handleMove(colIndex) {
        const rowIndex = getRowIndex(colIndex);
        if (rowIndex === -1) return; // Invalid move
        
        board[rowIndex][colIndex] = currentPlayer;
        renderBoard();
        if (checkForWin(rowIndex, colIndex)) {
            document.getElementById("status").textContent = currentPlayer === "yellow" ? "Yellow wins!" : "Red wins!";
            disableClicks(); // Disable click events on cells
            return;
        }
        if (checkForDraw()) {
            document.getElementById("status").textContent = "It's a draw!";
            return;
        }
        switchPlayer();
        
        if (currentPlayer === "yellow") {
            // AI's move
            setTimeout(() => {
                const randomColumn = getRandomColumn();
                handleMove(randomColumn);
            }, 500);
        } else {
            document.getElementById("status").textContent = "It's " + currentPlayer + "'s turn";
        }
    }
    
    function disableClicks() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.removeEventListener("click", handleClick);
        });
    }
    
    

    // Function to get the row index for a given column index
    function getRowIndex(colIndex) {
        for (let i = ROWS - 1; i >= 0; i--) {
            if (!board[i][colIndex]) {
                return i;
            }
        }
        return -1; // Column is full
    }

    // Function to switch player turns
    function switchPlayer() {
        currentPlayer = currentPlayer === "red" ? "yellow" : "red";
    }

    // Function to check for a win
    function checkForWin(rowIndex, colIndex) {
        const directions = [[1, 0], [0, 1], [1, 1], [-1, 1]];
        for (const [dx, dy] of directions) {
            let count = 1;
            for (const direction of [-1, 1]) {
                let x = colIndex + dx * direction;
                let y = rowIndex + dy * direction;
                while (board[y] && board[y][x] === currentPlayer) {
                    count++;
                    x += dx * direction;
                    y += dy * direction;
                }
            }
            if (count >= 4) return true;
        }
        return false;
    }

    // Function to check for a draw
    function checkForDraw() {
        return board.every(row => row.every(cell => cell));
    }

    // Function to reset the game
    function resetGame() {
        board = createBoard();
        renderBoard();
        showMessage(""); // Clear message
    }

    // Function to get a random column for AI's move
    function getRandomColumn() {
        return Math.floor(Math.random() * COLS);
    }

    // Function to display a message on the page
    function showMessage(message) {
        messageElement.textContent = message;
    }
});
