let stopwatchRunning = false;
let time = 0;
let interval;
let playerPosition = 0;
let goalPosition = 24;

const timeDisplay = document.getElementById("time");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const mazeContainer = document.getElementById("maze");

// Initialize a 20 X 20 maze
function generateMaze() {
    mazeContainer.innerHTML = "";
    for (let i = 0; i < 400; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add(Math.random() > 0.7 ? "wall" : "path");
        mazeContainer.appendChild(cell);
    }
}

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


// // Basic directional controls using the arrow keys on the keyboard
// document.addEventListener("keydown", (event) => {
//     switch (event.key) {
//         case "ArrowUp":
//             movePlayer(0, -1);
//             break;
//         case "ArrowDown":
//             movePlayer(0, 1);
//             break;
//         case "ArrowLeft":
//             movePlayer(-1, 0);
//             break;
//         case "ArrowRight":
//             movePlayer(1, 0);
//             break;
//     }
