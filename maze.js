var WALL = '\u9641';
var EMPTY  = ' ';
var width = process.argv[2];  //default if there is no input 
var height = process.argv[3];

width = (width) ? width : 50;
height = (height) ? height : 50;

var maze = [];
var completePath = false;
var wallUnits = width * height;
var emptyUnits = 0;
var ratio = emptyUnits / wallUnits; 

function generateEmpty(width, height) {
  var mazeString = WALL.repeat(width);
  for (var counter = 0; counter < height; counter++) {
    maze.push(mazeString);
  }
}  

function carvePath(x, y) {
  if (completePath && ratio > 0.5) {
     
  } else {
    maze[y].substring(x, x + 1, EMPTY);
    wallUnits--;
    emptyUnits++;
    //var dir = Math.Random();    //down: 0 <= dir < 0.25, left: 0.25 <= dir < 0.5, up: 0.5 <= dir < 0.75, right 0.75 <= dir < 1
    var moves = validMoves(x, y);

  }
}

function validMoves(x, y) { //returns validMoves from given coordinates. An empty string, or out of bounds space is not a valid move. 
  var dir = Math.Random(); 
  //var moves = [];
  if (dir < 0.25 && y + 1 < height && maze[y + 1].substr(x, 1) === WALL) {    //down
    return { x: x, y: y + 1 };
  } else if (dir < 0.5 && x - 1 >= 0 && maze[y].substr(x - 1, 1) === WALL) {   //left
    return { x: x - 1, y: y };
  } else if (dir < 0.75 && y - 1 >= 0 && maze[y - 1].substr(x, 1) === WALL) {   //up
    return {x: x, y: y - 1};// moves.push('up');   
  } else if (dir < 1 && x + 1 < width && maze[y].substr(x + 1, 1) === WALL){    //right
    return {x: x + 1, y: y}; //moves.push('right');   
  } else {
    return undefined;
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
