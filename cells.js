class Cell {
  constructor(i, j, w) {
    this.bee = false;
    this.reveal = false;

    this.neighbours = 0;
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
  }
}
function resolveAfter10Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 4000);
  });
}
function resolveAfterHalfSeconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 500);
  });
}

Cell.prototype.findSurrounding = function () {
  var total = 0;
  if (this.bee) {
    this.neighbours = -1;
    return;
  }
  for (var yy = -1; yy <= 1; yy++) {
    for (var xx = -1; xx <= 1; xx++) {
      var i = this.i + yy;
      var j = this.j + xx;
      if (i > -1 && i < 10 && j > -1 && j < 10) {
        var meobj = grid[i][j].bee;
        if (meobj) {
          total++;
        }
      }
    }
  }
  this.neighbours = total;
};
var alertMe = 0;

function displaySolution() {
  //try to make it start from the mine
  for (var i = 0; i < col; i++) {
    for (var j = 0; j < row; j++) {
      grid[i][j].reveals();
    }
  }
}

Cell.prototype.show = async function () {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.reveal) {
    if (this.bee) {
      fill(89);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
      if (alertMe == 0) {
        alertMe++;
        await resolveAfterHalfSeconds();

        alert("you hit a mine! Restarting the match!!");
        displaySolution();
        await resolveAfter10Seconds();
        location.reload();
      }
    } else {
      fill(126);
      rect(this.x, this.y, this.w, this.w);
      textAlign(CENTER);
      fill(0);
      text(this.neighbours, this.x + this.w * 0.5, this.y + this.w - 6);
    }
  }
};

Cell.prototype.contains = function (x, y) {
  return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
};

Cell.prototype.reveals = function () {
  this.reveal = true;
  if (this.neighbours == 0) {
    this.floodFilll();
  }
};
Cell.prototype.floodFilll = function () {
  for (var yy = -1; yy <= 1; yy++) {
    for (var xx = -1; xx <= 1; xx++) {
      var i = this.i + yy;
      var j = this.j + xx;
      if (i > -1 && i < 10 && j > -1 && j < 10) {
        var meobj = grid[i][j];
        if (!meobj.bee && !meobj.reveal) meobj.reveals();
      }
    }
  }
};
