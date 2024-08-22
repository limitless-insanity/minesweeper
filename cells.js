class Cell {
    constructor(xpos, ypos, x, y, bomb) {
      this.xpos = xpos;
      this.ypos = ypos;
      this.x = x;
      this.y = y;
      this.bomb = bomb;
      this.hidden = true;
      this.nCount = 0;
      this.flagged = false;
      this.fColor = [
        [255, 255, 255],
        [102, 255, 0],
        [204, 255, 0],
        [255, 204, 0],
        [255, 153, 0],
        [255, 51, 0],
        [255, 0, 0]
      ];
    }
  
    draw() {
      var angle = TWO_PI / 6;
      if (!this.hidden && this.nCount > 0 && !this.bomb) {
        fill(100);
      }
      if (!this.hidden && this.nCount == 0 && !this.bomb) {
        fill(204, 237, 250);
      }
      beginShape();
      for (var a = 0; a < TWO_PI; a += angle) {
        var sx = this.xpos + cos(a) * gridSize;
        var sy = this.ypos + sin(a) * gridSize;
        vertex(sx, sy);
      }
      endShape(CLOSE);
      if (!this.hidden) {
        if (this.nCount > 0) {
          push();
          textSize(18);
          fill(
            this.fColor[this.nCount][0],
            this.fColor[this.nCount][1],
            this.fColor[this.nCount][2]
          );
          translate(this.xpos - 20, this.ypos - 20);
          textAlign(CENTER, CENTER);
          text("" + this.nCount, 0, 0, 45, 40);
          pop();
        }
        noFill();
      }
      if (playing == false && this.bomb) {
        fill(0);
        ellipse(this.xpos, this.ypos, 20, 20);
        noFill();
      } else if (this.flagged) {
        push();
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(this.xpos, this.ypos - 5, 14, 10);
        line(this.xpos - 7, this.ypos - 5, this.xpos - 7, this.ypos + 10);
        pop();
      }
    }
    click(auto = false) {
      if (!this.flagged || auto == true) {
        this.flagged = false;
        if (this.bomb) {
          playing = false;
        } else if (this.hidden) {
          pieces--;
        }
  
        this.hidden = false;
        if (this.nCount == 0) {
          let neighbours = findNeighbours(this.x, this.y);
          for (let neighbour of neighbours) {
            let cell = cells[neighbour[0]][neighbour[1]];
            if (!cell.bomb && cell.hidden) {
              cell.click(true);
            }
          }
        }
      }
    }
    flag() {
      if (this.hidden) {
        this.flagged = !this.flagged;
      }
    }
  }
  