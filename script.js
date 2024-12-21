let stopwatchRunning = false;
let time = 0;
let interval;
let playerPosition = 0;
let goalPosition = 14;
let gridSize = 20;

const timeDisplay = document.getElementById("time");
const startStopButton = document.getElementById("startStopwatch");
const resetButton = document.getElementById("reset");
const mazeContainer = document.getElementById("maze");

// Initialize a 20 X 20 maze
function generateMaze() {
    mazeContainer.innerHTML = "";
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add(Math.random() > 0.7 ? "wall" : "path");
        cell.classList.add("cell");
        mazeContainer.appendChild(cell);
    }
}

//generat random position within maze
function generateRandomPosition(gridSize) {
    return {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),

    };
}
//Player and goal object
const player = generateRandomPosition(gridSize);
const goal = generateRandomPosition(gridSize);

function placeOnPath(entity){
    let isValid =false;
    while (!isValid){
        const randPos = generateRandomPosition(gridSize);
        const Index = generateRandomPosition.y * gridSize + generateRandomPosition.x;
        const cell = mazeContainer.children [Index];
        if(cell.classList.contains(path))  {
            isValid = true;
            entity.x = generateRandomPosition.x;
            entity.y = generateRandomPosition.y;
        }
    }
}

//Initialize Maze
generateMaze();

//place player and goaal within maze
function updateMaze(){
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.classList.remove("player", "goal"));
    const playerIndex = player.y * gridSize + player.x;
    const goalIndex = goal.y * gridSize + goal.x;
    cells[playerIndex].classList.add(player);
    cells[goalIndex].classList.add(goal);
}

generateMaze();
placeOnPath(player);
placeOnPath(goal);
updateMaze()

// Move the player within the bounds of the grid
function movePlayer(event) {
    let newX = player.x;
    let newY = player.y;
    switch (event.key) {
      case "ArrowUp":
        if (player.y > 0) player.y--;
        break;
      case "ArrowDown":
        if (player.y < gridSize - 1) player.y++;
        break;
      case "ArrowLeft":
        if (player.x > 0) player.x--;
        break;
      case "ArrowRight":
        if (player.x < gridSize - 1) player.x++;
        break;
      default:
        return;
    }

    const newIndex = newY * gridSize + newX;
    const targetCell = mazeContainer.children[newIndex];
  
    if (targetCell.classList.contains("path")){
        player.x = newX;
        player.y = newY;

        
    }
    // Check if the player reached the goal
    if (player.x === goal.x && player.y === goal.y) {
      alert("You made it out of the dungeon!");
    }
  
    // Update the maze
    updateMaze();
  }


  
  // Add event listener for keyboard input
  document.addEventListener("keydown", movePlayer);
  

// Shift the maze walls
function shiftMaze() {
    const cells = Array.from(mazeContainer.children);
    cells.forEach(cell => {
        cell.className = "cell";
        cell.classList.add(Math.random() > 0.7 ? "wall" : "path");
    });
}



// Stopwatch functionality
function startStopwatch() {
    if (stopwatchRunning) return;
    stopwatchRunning = true;

    interval = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (time % 3 === 0) {
            shiftMaze();
        }
    }, 1000);
}

function stopStopwatch() {
    clearInterval(interval);
    stopwatchRunning = false;
}

function resetStopwatch() {
    stopStopwatch();
    time = 0;
    timeDisplay.textContent = "0:00";
    generateMaze();
    placeOnPath(player);
    placeOnPath(goal);
    updateMaze();
}

startStopButton.addEventListener("click", () => {
    if (stopwatchRunning) {
        stopStopwatch();
        startStopButton.textContent = "Start";
    } else {
        startStopwatch();
        startStopButton.textContent = "Stop";
    }
});

resetButton.addEventListener("click", resetStopwatch);

// Initialize maze on page load
generateMaze();