

const mazeSize = 20;
const maze = document.querySelector('#maze');

let timer = 0;
let bestTime = Infinity; // Initialize to Infinity so any first-time score is considered the best.
let timerInterval; // For controlling the timer interval

const startTimer = () => {
  timer = 0; // Reset the timer for a new game
  timerInterval = setInterval(() => {
    timer++;
    timeElapsed.textContent = `Time: ${timer}s`; // Update the timer display
  }, 1000); // Increment every second
};

const stopTimer = () => {
  clearInterval(timerInterval); // Stop the timer
};

const checkBestTime = () => {
  if (timer < bestTime) {
    bestTime = timer; // Update the best time
    alert(`New best time: ${bestTime}s!`);
  } else {
    alert(`You finished in ${timer}s. Best time: ${bestTime}s.`);
  }
};

const resetGame = () => {
  stopTimer(); // Stop the previous timer
  startTimer(); // Start a new timer
  playerPosition = { x: 0, y: 0 };
  goalPosition = { x: mazeSize - 1, y: mazeSize - 1 };
  createMaze();
};



const times = [];



function timeElapsed() {
    const timeElapsed = document.querySelector("#timeLapased");
    const timeValue = parseFloat(timeInput.value);

    if (!isNaN(timeValue) && timeValue > 0) {
        times.push(timeValue);
        updateTimesList();
        timeInput.value = '';
    } else {
        alert('Please enter a valid positive number for time.');
    }
}

function updateTimesList() {
    const timesList = document.querySelector('#timesList');
    timesList.innerHTML = '';
    times.forEach((time, index) => {
        const li = document.createElement('li');
        li.textContent = `Attempt ${index + 1}: ${time} seconds`;
        timesList.appendChild(li);
    });
}

function calculateLowestTime() {
    if (times.length === 0) {
        alert('Please add some times first!');
        return;
    }
    const lowestTime = Math.min(...times);
    document.querySelector('#result').textContent = `The lowest time to reach the goal is ${lowestTime} seconds.`;
}

// Generate initial maze grid
let grid = [];
const generateMaze = () => {
    maze.innerHTML = "";
    grid = [];
    for (let row = 0; row < mazeSize; row++) {
        const rowArray = [];
        for (let col = 0; col < mazeSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add("cell"); // creates cell blocks
            // Randomly assign walls and paths
            if (Math.random() < 0.25) { // number of walls
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
};

// Add player and goal
const addPlayerAndGoal = () => {
    const playerCell = maze.children[0];
    playerCell.classList.remove("wall");
    playerCell.classList.add("player");
    grid[0][0] = "player";

    const goalCell = maze.children[mazeSize * mazeSize - 1];
    goalCell.classList.remove("wall");
    goalCell.classList.add("goal");
    grid[mazeSize - 1][mazeSize - 1] = "goal";
};

// Shift walls and paths
const shiftWalls = () => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = maze.children[i * mazeSize + j];
            if (!cell.classList.contains("player") && !cell.classList.contains("goal")) {
                cell.className = "cell";
                if (Math.random() < 0.25) {
                    cell.classList.add("wall");
                    grid[i][j] = "wall";
                } else {
                    cell.classList.add("path");
                    grid[i][j] = "path";
                }
            }
        }
    }
};

// Player movement
let playerPosition = { x: 0, y: 0 };
const movePlayer = (dx, dy) => {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (
        newX >= 0 && newX < mazeSize &&
        newY >= 0 && newY < mazeSize &&
        grid[newY][newX] !== "wall"
    ) {
        // Update player position
        const currentCell = maze.children[playerPosition.y * mazeSize + playerPosition.x];
        currentCell.classList.remove("player");
        currentCell.classList.add("path");

        playerPosition.x = newX;
        playerPosition.y = newY;

        const newCell = maze.children[playerPosition.y * mazeSize + playerPosition.x];
        newCell.classList.remove("path");
        newCell.classList.add("player");

        // Check for goal
        if (grid[newY][newX] === "goal") {
            alert("You reached the goal");
            generateMaze();
            addPlayerAndGoal();
        }
    }
};

// Keyboard controls
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

// Initialize game
generateMaze();
addPlayerAndGoal();
document.querySelector("#shift-walls").addEventListener("click", shiftWalls);
