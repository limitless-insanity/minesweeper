var grid;
var col;
var row;
var mines = 20;
var w = 20;
var totalBees = 10;

function makeMatrix(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(201, 201);
  row = 10;
  col = 10;

  grid = makeMatrix(col, row);

  for (var i = 0; i < col; i++) {
    for (var j = 0; j < row; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  //add bees
  for (var n = 0; n < 15; n++) {
    var randRow = floor(random(10));
    var randCol = floor(random(10));
    if (!grid[randCol][randRow].bee) {
      grid[randCol][randRow].bee = true;
    } else {
      n--;
      continue;
    }
  }

  for (var i = 0; i < col; i++) {
    for (var j = 0; j < row; j++) {
      grid[i][j].findSurrounding();
    }
  }
}

function mousePressed() {
  for (var i = 0; i < col; i++) {
    for (var j = 0; j < row; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveals();
      }
    }
  }
}

function draw() {
  background(210);
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      grid[i][j].show();
    }
  }
}
