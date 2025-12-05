// Paramètres par défaut
let COLS = 20;
let ROWS = 20;
let CELL_SIZE;
let grid = [];
let canvas;

// Couleurs dynamiques
let currentShapeColor = '#3C8CDE'; // couleur des formes
let gridColor = '#B4B4B4';          // couleur de la grille
let cellBgColor = '#FFFFFF';        // couleur du fond des cases

// Paramètres de contour des formes
let strokeEnabled = true;
let strokeColorVal = '#000000';
let strokeWeightVal = 2;

// Affichage de la grille
let showGrid = true; // par défaut, la grille est affichée

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-holder");

  rectMode(CENTER);
  ellipseMode(CENTER);
  angleMode(DEGREES);

  initGrid();

  // --- REDIMENSIONNEMENT DE LA GRILLE ---
  const resizeBtn = document.getElementById("resizeGridBtn");
  if(resizeBtn){
    resizeBtn.addEventListener("click", () => {
      const colsVal = parseInt(document.getElementById("colsInput").value);
      const rowsVal = parseInt(document.getElementById("rowsInput").value);
      if(!isNaN(colsVal) && colsVal > 0) COLS = colsVal;
      if(!isNaN(rowsVal) && rowsVal > 0) ROWS = rowsVal;
      initGrid();
    });
  }

  // --- COULEUR DES FORMES ---
  const shapeColorInput = document.getElementById('shapeColor');
  if(shapeColorInput){
    shapeColorInput.addEventListener('input', (e) => currentShapeColor = e.target.value);
  }

  // --- FAMILLE GRILLE ---
  const gridColorInput = document.getElementById('gridColor');
  if(gridColorInput){
    gridColorInput.addEventListener('input', (e) => gridColor = e.target.value);
  }
  const cellBgInput = document.getElementById('cellBgColor');
  if(cellBgInput){
    cellBgInput.addEventListener('input', (e) => cellBgColor = e.target.value);
  }
  const gridToggle = document.getElementById('gridToggle');
  if(gridToggle){
    showGrid = gridToggle.checked;
    gridToggle.addEventListener('change', () => {
      showGrid = gridToggle.checked;
    });
  }

  // --- CONTOUR DES FORMES ---
  const strokeToggle = document.getElementById('strokeToggle');
  const strokeOptions = document.getElementById('strokeOptions');
  if(strokeToggle && strokeOptions){
    strokeOptions.style.display = strokeToggle.checked ? 'block' : 'none';
    strokeEnabled = strokeToggle.checked;
    strokeToggle.addEventListener('change', () => {
      strokeEnabled = strokeToggle.checked;
      strokeOptions.style.display = strokeEnabled ? 'block' : 'none';
    });
  }

  const strokeColorInput = document.getElementById('strokeColor');
  if(strokeColorInput){
    strokeColorInput.addEventListener('input', (e) => strokeColorVal = e.target.value);
  }

  const strokeWeightInput = document.getElementById('strokeWeight');
  if(strokeWeightInput){
    strokeWeightInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      if(!isNaN(val) && val >= 0) strokeWeightVal = val;
    });
  }
}

function draw() {
  background(240);

  const gridWidth = COLS * CELL_SIZE;
  const gridHeight = ROWS * CELL_SIZE;
  const offsetX = (width - gridWidth) / 2;
  const offsetY = (height - gridHeight) / 2;

  for(let r=0; r<ROWS; r++){
    for(let c=0; c<COLS; c++){
      const cx = offsetX + c*CELL_SIZE + CELL_SIZE/2;
      const cy = offsetY + r*CELL_SIZE + CELL_SIZE/2;

      // Hover
      if(
        mouseX > offsetX + c*CELL_SIZE &&
        mouseX < offsetX + (c+1)*CELL_SIZE &&
        mouseY > offsetY + r*CELL_SIZE &&
        mouseY < offsetY + (r+1)*CELL_SIZE
      ){
        fill(230);
      } else {
        fill(cellBgColor);
      }

      // Fond de la case
      rect(cx, cy, CELL_SIZE, CELL_SIZE);

      // Dessin des formes avec contour
      if(strokeEnabled){
        stroke(strokeColorVal);
        strokeWeight(strokeWeightVal);
      } else {
        noStroke();
      }

      fill(currentShapeColor);
      switch(grid[r][c]){
        case 1: rect(cx, cy, CELL_SIZE, CELL_SIZE); break;
        case 2: ellipse(cx, cy, CELL_SIZE, CELL_SIZE); break;
        case 3:
          triangle(
            cx, cy - CELL_SIZE/2,
            cx - CELL_SIZE/2, cy + CELL_SIZE/2,
            cx + CELL_SIZE/2, cy + CELL_SIZE/2
          ); break;
        case 4: rect(cx, cy, CELL_SIZE, CELL_SIZE, 0, CELL_SIZE/2, 0, 0); break;
        case 5: rect(cx, cy, CELL_SIZE, CELL_SIZE, 0, 0, CELL_SIZE/2, 0); break;
        case 6: rect(cx, cy, CELL_SIZE, CELL_SIZE, 0, 0, 0, CELL_SIZE/2); break;
        case 7: rect(cx, cy, CELL_SIZE, CELL_SIZE, CELL_SIZE/2, 0, 0, 0); break;
      }

      // Contour de la grille (affiché seulement si showGrid)
      if(showGrid){
        noFill();
        stroke(gridColor);
        strokeWeight(1);
        rect(cx, cy, CELL_SIZE, CELL_SIZE);
      }
      noStroke();
    }
  }
}

function mousePressed() {
  const gridWidth = COLS * CELL_SIZE;
  const gridHeight = ROWS * CELL_SIZE;
  const offsetX = (width - gridWidth) / 2;
  const offsetY = (height - gridHeight) / 2;

  if(
    mouseX < offsetX || mouseX > offsetX + gridWidth ||
    mouseY < offsetY || mouseY > offsetY + gridHeight
  ) return;

  const col = Math.floor((mouseX - offsetX)/CELL_SIZE);
  const row = Math.floor((mouseY - offsetY)/CELL_SIZE);

  if(row<0 || row>=ROWS || col<0 || col>=COLS) return;

  grid[row][col] = (grid[row][col]+1)%8;
}

function initGrid(){
  CELL_SIZE = min(width/COLS, height/ROWS);
  grid=[];
  for(let r=0; r<ROWS; r++){
    grid[r]=[];
    for(let c=0; c<COLS; c++){
      grid[r][c]=0;
    }
  }
  rectMode(CENTER);
  ellipseMode(CENTER);
  angleMode(DEGREES);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  initGrid();
}
