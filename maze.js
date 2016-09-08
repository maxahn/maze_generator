var WALL = '\u9641';
var EMPTY  = '\u5182';
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
  if (completePath) {//ratio > 0.5) {
    return;     
  } else {
    //console.log('blah');
    maze[y] = maze[y].substring(0, x) + EMPTY + maze[y].substring(x + 1, width + 1);
    wallUnits--;
    emptyUnits++;
    //var dir = Math.Random();    //down: 0 <= dir < 0.25, left: 0.25 <= dir < 0.5, up: 0.5 <= dir < 0.75, right 0.75 <= dir < 1
    var vm = validMove(x,y);
    console.log(vm);
    console.log('x: ' +  vm[0] + ' y: ' + vm[1]);
    if (vm[0] === 0 || vm[1] === 0) {
      completePath = true;
    } else {
      carvePath(vm[0], vm[1]);
    }
  }
}

function validMove(x, y) { //returns validMoves from given coordinates. An empty string, or out of bounds space is not a valid move. 
  var dir = Math.Random; 
  var move;
  //var moves = [];
  var counter = 4;
  while (counter > 0 || move) {
    if (dir < 0.25 && withinBounds(x, y + 1)) {    //down
      move = { x: x, y: y + 1 };
    } 
    if (dir < 0.5 && withinBounds(x - 1, y)) {   //left
      move = { x: x - 1, y: y }; 
    }
    if (dir < 0.75 && withinBounds(x, y - 1)) {    //up
      move = { x: x, y: y - 1 };
    } 
    if (dir < 1 && withinBounds(x + 1, y)) { //right
      move = { x: x + 1, y };
    }
    counter--;
  }
  return move;
}

function withinBounds(x, y) {
  return x >= 0 && x < width && y >= 0 && y < height && maze[y].substr(x, 1) === WALL;
}

function printMaze() {
  for (var counter = 0; counter < maze.length; counter++) {
    console.log(maze[counter]);
  }
}

function init() {
  generateEmpty(width, height);
  carvePath(10, 0);
  printMaze();
}

init();
