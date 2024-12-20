const maze = document.getElementById("maze");
const timeElapsed = document.getElementById("time-elapsed");

const mazeSize = 10;
let playerPosition = { x: 0, y: 0 }; // Starting position
let goalPosition = { x: mazeSize - 1, y: mazeSize - 1 }; // Goal position
let timer = 0;

// Create maze grid
const grid = [];
const createMaze = () => {
  maze.innerHTML = ""; // Clear the maze
  grid.length = 0;

  for (let row = 0; row < mazeSize; row++) {
    const rowArray = [];
    for (let col = 0; col < mazeSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (Math.random() < 0.3 && !(row === 0 && col === 0) && !(row === mazeSize - 1 && col === mazeSize - 1)) {
        cell.classList.add("wall");
        rowArray.push("wall");
      } else {
        cell.classList.add("path");
        rowArray.push("path");
      }
      maze.appendChild(cell);
    }
    grid.push(rowArray);
  }

  // Place player and goal
  updateCell(playerPosition.x, playerPosition.y, "player");
  updateCell(goalPosition.x, goalPosition.y, "goal");
};

// Update a specific cell's class
const updateCell = (x, y, type) => {
  const cellIndex = y * mazeSize + x;
  const cell = maze.children[cellIndex];
  cell.className = "cell"; // Reset cell class
  if (type === "wall") cell.classList.add("wall");
  if (type === "path") cell.classList.add("path");
  if (type === "player") cell.classList.add("player");
  if (type === "goal") cell.classList.add("goal");
};

// Shift maze cells
const shiftMaze = () => {
  const shiftedGrid = [];
  for (let row = 0; row < mazeSize; row++) {
    shiftedGrid.push([]);
    for (let col = 0; col < mazeSize; col++) {
      const newRow = (row + 1) % mazeSize;
      shiftedGrid[newRow][col] = grid[row][col];
    }
  }
  // Update the grid and redraw
  for (let row = 0; row < mazeSize; row++) {
    for (let col = 0; col < mazeSize; col++) {
      grid[row][col] = shiftedGrid[row][col];
      const type = grid[row][col];
      updateCell(col, row, type);
    }
  }
};

// Move the player
const movePlayer = (dx, dy) => {
  const newX = playerPosition.x + dx;
  const newY = playerPosition.y + dy;

  // Check boundaries
  if (newX < 0 || newX >= mazeSize || newY < 0 || newY >= mazeSize) return;

  // Check if the target cell is a wall
  if (grid[newY][newX] === "wall") return;

  // Move player
  updateCell(playerPosition.x, playerPosition.y, "path");
  playerPosition.x = newX;
  playerPosition.y = newY;
  updateCell(playerPosition.x, playerPosition.y, "player");

  // Check for win
  if (newX === goalPosition.x && newY === goalPosition.y) {
    alert("You reached the goal! Time: " + timer + " seconds");
    resetGame();
  }
};

// Reset the game
const resetGame = () => {
  playerPosition = { x: 0, y: 0 };
  goalPosition = { x: mazeSize - 1, y: mazeSize - 1 };
  timer = 0;
  createMaze();
};

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      movePlayer(0, -1);
      break;
    case "ArrowDown":
      movePlayer(0, 1);
      break;
    case "ArrowLeft":
      movePlayer(-1, 0);
      break;
    case "ArrowRight":
      movePlayer(1, 0);
      break;
  }
});

// Timer and maze shifting
setInterval(() => {
  timer++;
  timeElapsed.textContent = timer;
  shiftMaze();
}, 3000);

// Initialize the game
createMaze();
