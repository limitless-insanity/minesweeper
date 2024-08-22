// hexagonal grid
let gridSize = 20;
let xCells = 21;
let yCells = 15;
let width = (gridSize - 2.35) * (xCells * 2);
let height = (gridSize - 0.5) * ((yCells + 1) * 2);
let pieces = 0;
let bombs = 0;
let playing = true;
let firstClick = true;

setup = () => {
  createCanvas(width, height);
  reset();
  noLoop();
};

draw = () => {
  background(255);
  for (let x = 0; x < cells.length; x++) {
    for (let y = 0; y < cells[x].length; y++) {
      cells[x][y].draw();
    }
  }

  if (pieces == 0 || playing == false) {
    let words = pieces == 0 ? "You win!" : "You lose!";
    push();
    rectMode(RADIUS);
    fill(0);
    strokeWeight(5);
    if (words == "You win!") {
      stroke(0, 255, 100);
    } else {
      stroke(255, 23, 124);
    }
    rect(width / 2, height / 2, width, 60);
    rectMode(CORNER);
    noStroke();
    if (words == "You win!") {
      fill(0, 255, 100);
    } else {
      fill(255, 23, 124);
    }
    textSize(100);
    textAlign(CENTER, CENTER);
    text(words, 0, 0, width, height);
    pop();
  }
};

reset = () => {
  firstClick = true;
  bombs = 0;
  pieces = xCells * yCells;

  cells = new Array(xCells);
  for (let x = 0; x < cells.length; x++) {
    cells[x] = new Array(yCells);
    for (let y = 0; y < cells[x].length; y++) {
      let xpos = x * (gridSize * 2 - gridSize / 4) + gridSize;
      let ypos =
        x % 2 == 0
          ? y * (gridSize * 2) + gridSize * 2
          : y * (gridSize * 2) + gridSize;
      let bomb = random(0, 100) > 80 ? true : false;
      if (bomb) bombs++;
      cells[x][y] = new Cell(xpos, ypos, x, y, bomb);
    }
  }
  pieces = pieces - bombs;

  calculateNeighbours();
};

findNeighbours = (x, y) => {
  let neighbours = [];
  if (y - 1 >= 0) neighbours.push([x, y - 1]);
  if (y + 1 <= yCells - 1) neighbours.push([x, y + 1]);
  if (x - 1 >= 0) neighbours.push([x - 1, y]);
  if (x + 1 <= xCells - 1) neighbours.push([x + 1, y]);

  //If even row
  if (cells[x][y].x % 2 == 0) {
    if (x - 1 >= 0 && y + 1 <= yCells - 1) neighbours.push([x - 1, y + 1]);
    if (x + 1 <= xCells - 1 && y + 1 <= yCells - 1)
      neighbours.push([x + 1, y + 1]);
  } else {
    if (x - 1 >= 0 && y - 1 >= 0) neighbours.push([x - 1, y - 1]);
    if (x + 1 <= xCells - 1 && y - 1 >= 0) neighbours.push([x + 1, y - 1]);
  }
  return neighbours;
};

mouseReleased = () => {
  let button;
  if (mouseButton === LEFT) {
    button = "left";
  }
  if (mouseButton === RIGHT) {
    button = "right";
  }

  if (playing == true && pieces != 0) {
    let cell;
    for (let x = 0; x < cells.length; x++) {
      for (let y = 0; y < cells[x].length; y++) {
        if (dist(mouseX, mouseY, cells[x][y].xpos, cells[x][y].ypos) < 20) {
          cell = cells[x][y];
        }
      }
    }
    if (cell) {
      if (button == "left") {
        if (firstClick && cell.bomb) {
          console.log("hit bomb");
          cell.bomb = false;
          pieces += 1;
          calculateNeighbours();
        } else {
          firstClick = false;
        }
        cell.click();
      } else if (button == "right") {
        cell.flag();
      }
    }
  } else {
    reset();
    playing = true;
  }
  redraw();
};

function calculateNeighbours() {
  for (let x = 0; x < cells.length; x++) {
    for (let y = 0; y < cells[x].length; y++) {
      let count = 0;
      let neighbours = findNeighbours(x, y);
      for (let neighbour of neighbours) {
        if (cells[neighbour[0]][neighbour[1]].bomb) count++;
      }
      cells[x][y].nCount = count;
    }
  }
}
