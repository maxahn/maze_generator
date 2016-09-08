var WALL = '\u9641';
var EMPTY  = ' ';
var width = process.argv[2];  //default if there is no input 
var height = process.argv[3];

width = (width) ? width : 50;
height = (height) ? height : 50;

var maze = [];

function generateEmpty(width, height) {
  var mazeString = WALL.repeat(width);
  for (var counter = 0; counter < height; counter++) {
    maze.push(mazeString);
  }
}  

function printMaze() {
  for (var counter = 0; counter < maze.length; counter++) {
    console.log(maze[counter]);
  }
}

function init() {
  generateEmpty(width, height);
  printMaze();
}

init();
