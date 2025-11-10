let COLS = 20;
let ROWS = 20;
let CELL_SIZE;
let grid = [];
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-holder");

  initGrid();

  // bouton pour redimensionner la grille
  document.getElementById("resizeGridBtn").addEventListener("click", () => {
    COLS = parseInt(document.getElementById("colsInput").value);
    ROWS = parseInt(document.getElementById("rowsInput").value);
    initGrid();
  });
}

function draw() {
  background(240);

  let gridWidth = COLS * CELL_SIZE;
  let gridHeight = ROWS * CELL_SIZE;
  let offsetX = (width - gridWidth) / 2;
  let offsetY = (height - gridHeight) / 2;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let x = offsetX + c * CELL_SIZE + CELL_SIZE / 2;
      let y = offsetY + r * CELL_SIZE + CELL_SIZE / 2;

      // hover
      if (
        mouseX > offsetX + c * CELL_SIZE && mouseX < offsetX + (c + 1) * CELL_SIZE &&
        mouseY > offsetY + r * CELL_SIZE && mouseY < offsetY + (r + 1) * CELL_SIZE
      ) {
        fill(230);
      } else {
        fill(255);
      }
      rect(x, y, CELL_SIZE, CELL_SIZE);

      // formes
      fill(60, 140, 220);
      switch(grid[r][c]) {
        case 1: rect(x, y, CELL_SIZE, CELL_SIZE); break;
        case 2: ellipse(x, y, CELL_SIZE, CELL_SIZE); break;
        case 3:
          triangle(
            x, y - CELL_SIZE/2,
            x - CELL_SIZE/2, y + CELL_SIZE/2,
            x + CELL_SIZE/2, y + CELL_SIZE/2
          );
          break;
        case 4: rect(x, y, CELL_SIZE, CELL_SIZE, 0, CELL_SIZE/2, 0, 0); break;
        case 5: rect(x, y, CELL_SIZE, CELL_SIZE, 0, 0, CELL_SIZE/2, 0); break;
        case 6: rect(x, y, CELL_SIZE, CELL_SIZE, 0, 0, 0, CELL_SIZE/2); break;
        case 7: rect(x, y, CELL_SIZE, CELL_SIZE, CELL_SIZE/2, 0, 0, 0); break;
      }

      noFill();
      stroke(180);
      rect(x, y, CELL_SIZE, CELL_SIZE);
      noStroke();
    }
  }
}

function mousePressed() {
  let gridWidth = COLS * CELL_SIZE;
  let gridHeight = ROWS * CELL_SIZE;
  let offsetX = (width - gridWidth) / 2;
  let offsetY = (height - gridHeight) / 2;

  if (
    mouseX < offsetX || mouseX > offsetX + gridWidth ||
    mouseY < offsetY || mouseY > offsetY + gridHeight
  ) return;

  let col = Math.floor((mouseX - offsetX) / CELL_SIZE);
  let row = Math.floor((mouseY - offsetY) / CELL_SIZE);

  grid[row][col] = (grid[row][col] + 1) % 8;
}

function initGrid() {
  CELL_SIZE = min(width / COLS, height / ROWS);
  grid = [];
  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      grid[r][c] = 0;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initGrid();
}
