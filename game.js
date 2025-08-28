let gridSize = 10;                 
const Grid_width = 400;            
let currMode = "draw";            
let color = "#0000FF";             
let isMouseDown = false;

const container = document.querySelector(".container");
const gridSizeBtn = document.querySelector(".Grid-Size");
const drawBtn = document.querySelector(".Color");
const eraserBtn = document.querySelector(".Eraser");
const RainbowBtn = document.querySelector(".glow-on-hover");
const currentModeEl = document.querySelector(".status-text");
const gridSizeShow = document.querySelector(".grid-size-text");

function gridCreate(size) {
    container.innerHTML = "";

    container.style.width = `${Grid_width}px`;
    container.style.height = `${Grid_width}px`;

    const cellDimension = Grid_width / size;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${cellDimension}px`;
        cell.style.height = `${cellDimension}px`;
        cell.style.boxSizing = "border-box";
        cell.style.border = "1px solid #000000";
        cell.style.backgroundColor = "white";

        cell.addEventListener("mousedown", handleCellInteraction);
        cell.addEventListener("mouseover", (e) => {
            if (isMouseDown) handleCellInteraction(e);
        });
        container.appendChild(cell);
    }

    updateStatusDisplay();
}

function updateStatusDisplay() {
    if (currentModeEl) currentModeEl.textContent = currMode;
    if (gridSizeShow) gridSizeShow.textContent = `${gridSize} x ${gridSize}`;
}

function handleCellInteraction(e) {
    const el = e.target;
    if (!el.classList.contains("cell")) return;

    if (currMode === "draw") {
        el.style.backgroundColor = color;
    } else if (currMode === "erase") {
        el.style.backgroundColor = "white";
    } else if (currMode === "Rainbow") {
        el.style.backgroundColor = HexColor();
    }
}

function HexColor() {
  const colors = ["#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#9D4EDD"];
  return colors[Math.floor(Math.random() * colors.length)];
}

container.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    if (e.target && e.target.classList.contains("cell")) handleCellInteraction(e);
    e.preventDefault();
});

window.addEventListener("mouseup", () => {
    isMouseDown = false;
});

if (gridSizeBtn) {
    gridSizeBtn.addEventListener("click", () => {
        const input = prompt("Enter the size for the grid", gridSize);
        const newSize = Number(input);
        if (Number.isInteger(newSize) && newSize >= 1 && newSize <= 100) {
            gridSize = newSize;
            gridCreate(gridSize);
        } else {
            alert("Invalid size. Please enter an integer between 1 and 100.");
        }
    });
}

if (drawBtn){
    drawBtn.addEventListener("click", ()=>{
        currMode = "draw";
        updateStatusDisplay();
    });
}

if (eraserBtn){
    eraserBtn.addEventListener("click", ()=>{
        currMode = "erase";
        updateStatusDisplay();
    });
}

if (RainbowBtn){
    RainbowBtn.addEventListener("click", ()=>{
        currMode = "Rainbow";
        updateStatusDisplay();
    });
}

gridCreate(gridSize);
updateStatusDisplay();