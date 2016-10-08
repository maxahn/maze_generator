const WALL  = '\u56c1',
      EMPTY = '\u56d7';
var MazeGenerator = (width = 50, height = 50) => {
  this.width = width;
  this.height = height;

  static get wall() {
    return WALL; 
  }
  static get empty() {
    return EMPTY; 
  }

}

