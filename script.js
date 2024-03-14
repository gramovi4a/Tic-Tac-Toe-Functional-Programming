
// Initialize the game state
function initializeGame() {
  return {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    gameEnded: false
  };
}

// Make a move and return the new game state
function makeMove(gameState, index) {
  if (gameState.gameEnded || gameState.board[index] !== null) {
    return gameState; // Game has ended or cell is already occupied
  }

  const newBoard = [...gameState.board]; // Copy the board array
  newBoard[index] = gameState.currentPlayer;

  const winner = checkWinner(newBoard);
  const gameEnded = winner || newBoard.every(cell => cell !== null);

  return {
    ...gameState,
    board: newBoard,
    currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
    gameEnded
  };
}

// Check if there is a winner or if the game ended in a draw
function checkWinner(board) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // return the winning player
    }
  }
  
  if (board.every(cell => cell !== null)) {// if every cell is occupied, but no winner
        return 'draw'; // game ended in a draw
  }

  return null; // no winner yet
}

// Render the game board
function renderBoard(board, onClickCell) {
  const boardContainer = document.getElementById('board');
  boardContainer.innerHTML = ''; // clears the content of the boardContainer.
  board.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value || '';
    cell.addEventListener('click', () => onClickCell(index));
    boardContainer.appendChild(cell);
  });
}

// Render the game status
function renderStatus(currentPlayer, winner) {
  const statusElement = document.getElementById('status');
  if (winner) {
    statusElement.textContent = winner === 'draw' ? 'It\'s a draw!' : `Player ${winner} wins!`;
  } else {
    statusElement.textContent = `Current player: ${currentPlayer}`;
  }
}

// Restart the game
function restartGame() {
  game = initializeGame();
  renderBoard(game.board, onClickCell);
  renderStatus(game.currentPlayer, null);
}

// Function to handle cell clicks
function onClickCell(index) {
  game = makeMove(game, index);
  renderBoard(game.board, onClickCell);
  const winner = checkWinner(game.board);
  renderStatus(game.currentPlayer, winner);
}

// Initialize the game and render the initial state
game = initializeGame();
renderBoard(game.board, onClickCell);
renderStatus(game.currentPlayer, null);

// Restart button event listener
document.getElementById('restart-btn').addEventListener('click', restartGame);
