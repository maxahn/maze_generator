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
function firstStep() {
  var ran = getRandomInt(1, maze.length - 2);
  carve(ran, 0);
  carve(ran, 1);
  return ran;
}

var branchPoints = [];
var freq = 0; 
function carvePath(x, y) { //carves path from first position
  if (lastStep(y)) {
    carve(x,y);  
  } else {
    carve(x,y);
    freq++;
    if (freq % 3 === 0) {
      branchPoints.push({x: x, y: y});
    }
    var vMoves = validMoves(x,y);
    if (vMoves.length > 0) {
      var ran = getRandomInt(0, vMoves.length - 1);
      var m = vMoves[ran];
      carvePath(m.x, m.y);
    } else {
      var branch = branchPoints.pop();
      if (branchPoints.length > 0) {
        carvePath(branch.x, branch.y);       
      } 
    } 
  }
  // var curr = { x: x, y: 1}
  // while (!completePath) {
  //   var vMoves = validMoves(curr.x, curr.y); 
  //   if (vMoves.length > 0) {
  //     var ran = getRandomInt(0, vMoves.length - 1);//there will be some issues when there are zero vMoves
  //     // console.log('vMoves.length: ' + vMoves.length);
  //     // console.log('random num: ' + ran);
  //     var dir = vMoves[ran];
  //     carve(dir.x, dir.y);
  //     curr.x = dir.x;
  //     curr.y = dir.y;
  //   } else {
  //     carve(dir.x, dir.y + 1);
  //   }
  // }
}
function carve(x,y) {
  maze[y] = maze[y].substring(0, x) + EMPTY + maze[y].substring(x + 1, maze.length + 1);
}

function validMoves(x, y) { //returns validMoves from given coordinates. An empty string, or out of bounds space is not a valid move. Else if no moves are valid, it returns false;
  var moves = getMoves(x, y);
  //need to reduce so that it carves tiles that are not directly next to already carved tiles, or on edges of the maze 
  var validMoves = [];
  var right = moves[0];
  // console.log('right: ' + right.x + ',' + right.y);
  var up = moves[1];
  var left = moves[2];
  var down = moves[3];
  
  if (surroundingWall(down.x, down.y) === undefined) {
    validMoves.push(down);
    completePath = true;
    return validMoves;
  } else {
    if (withinBounds(right.x, right.y) && surroundingWall(right.x, right.y)) {    //right
      validMoves.push(right); 
    } 
    // if (withinBounds(up.x, up.y) && surroundingWall(up.x, up.y)) {    //up
    //   validMoves.push(up); 
    // } 
    if (withinBounds(left.x, left.y) && surroundingWall(left.x, left.y)) {    //left
      validMoves.push(left); 
    } 
    if (withinBounds(down.x, down.y) && surroundingWall(down.x, down.y)) {    //down
      validMoves.push(down); 
    } 
  }
  return validMoves; 
}

function surroundingWall(x, y) { //returns true if direct spaces around given pos are wall
  // if (!completePath) {
    var walls = 0;
    if (isWall(x, y - 1)) { //up
      walls++;
    } 
    if (isWall(x, y + 1)) { //down
      if (lastStep(x, y + 1)) { //returns x, y pos if it is last step
        // console.log(y + 1);
        return undefined;
      }
      walls++;
    } 
    if (isWall(x + 1, y)) { //right
      walls++;
    } 
    if (isWall(x - 1, y)) { //left
      walls++;
    };
    return walls >= 3;
  // }

}
function isWall(x, y) {
  if (maze[y] && maze[y].substr(x, 1)) {
    return maze[y].substr(x, 1) === WALL;
  } else {
    return false;
  }
}
function getMoves(x, y) { //return ALL moves (up, down, left, right) from given pos
  var moves = [];
  moves.push({ x: x + 1, y }); //right [0]
  moves.push({ x: x, y: y - 1 }); //up [1]
  moves.push({ x: x - 1, y: y }); // left [2]
  moves.push({ x: x, y: y + 1 }); //down [3]
  return moves;
}

function lastStep(y) { //checks if it is a tile from bottom row 
  // console.log('lastStep: ' + y);
  // console.log('height: ' + height);
  return y === height - 1;
}

function getRandomInt(min, max) { //returns random integer between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function withinBounds(x, y) {
  return x > 0 && x < width && y > 0 && y < height && maze[y] && maze[y].substr(x, 1) && maze[y].substr(x, 1) === WALL;
}

function printMaze() {
  for (var counter = 0; counter < maze.length; counter++) {
    console.log(maze[counter]);
  }
}

function init() {
  generateEmpty(width, height);
  var firstX = firstStep();
  carvePath(firstX, 1);
  printMaze();
}

init();
