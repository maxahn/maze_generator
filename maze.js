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
  // maze[0] = maze[0].substring(0, ran) + EMPTY + maze[0].substring(ran + 1, maze.length + 1);
  // maze[1] = maze[1].substring(0, ran) + EMPTY + maze[1].substring(ran + 1, maze.length + 1);
  return ran;
}
function carvePath(x) { //carves path from first position
  // if (completePath) {//ratio > 0.5) {
  //   return;     
  // } else {
  //   //console.log('blah');
  //   maze[y] = maze[y].substring(0, x) + EMPTY + maze[y].substring(x + 1, width + 1);
  //   wallUnits--;
  //   emptyUnits++;
  //   //var dir = Math.Random();    //down: 0 <= dir < 0.25, left: 0.25 <= dir < 0.5, up: 0.5 <= dir < 0.75, right 0.75 <= dir < 1
  //   var vm = validMove(x,y);
  //   console.log(vm);
  //   console.log('x: ' +  vm[0] + ' y: ' + vm[1]);
  //   if (vm) {
  //     if (vm[0] === 0 || vm[1] === 0) {
  //       completePath = true;
  //     } else {
  //       carvePath(vm[0], vm[1]);
  //     }
  //   }
  // }
  // var curr = {x: x, y: 1};
  //
  //
  var curr = { x: x, y: 1}
  while (!completePath) {
    var vMoves = validMoves(curr.x, curr.y); 
    var ran = getRandomInt(0, vMoves.length - 1);//there will be some issues when there are zero vMoves
    var dir = vMoves[ran];

    carve(dir.x, dir.y);
    curr.x = dir.x;
    curr.y = dir.y;
  }
  
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
  
  // console.log('right withinBounds' + withinBounds(right.x, right.y));
  // console.log('left withinBounds' + withinBounds(left.x, left.y));
  // console.log('down withinBounds' + withinBounds(down.x, down.y));
  // console.log('up withinBounds' + withinBounds(up.x, up.y));
  // console.log('right surroundingWall' + surroundingWall(right.x, right.y));
  // console.log('left surroundingWall' + surroundingWall(left.x, left.y));
  // console.log('down surroundingWall' + surroundingWall(down.x, down.y));
  // console.log('up surroundingWall' + surroundingWall(up.x, up.y));
  if (surroundingWall(down.x, down.y) === undefined) {
    validMoves.push(down);
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
  // console.log(validMoves.length);
  return validMoves; 
  // if (withinBounds(x - 1, y)) {   //left
  //   // console.log('left');
  //   moves.push({ x: x - 1, y: y }); 
  // }
  // if (withinBounds(x, y - 1)) {    //up
  //   // console.log('up');
  //   moves.push({ x: x, y: y - 1 });
  // } 
  // if (withinBounds(x + 1, y)) { //right
  //   // console.log('right');
  //   moves.push({ x: x + 1, y });
  // } 
  // if (moves.length > 0) {
  //   var index = getRandomInt(0, moves.length); 
  //   return moves[index];
  // } else {
  //   return undefined;
  // }
}

function surroundingWall(x, y) { //returns true if direct spaces around given pos are wall
  // if (!completePath) {
    var walls = 0;
    if (isWall(x, y - 1)) { //up
      walls++;
    } 
    if (isWall(x, y + 1)) { //down
      if (lastStep(x, y + 1)) { //returns x, y pos if it is last step
        completePath = true;
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
// function getTile(x, y) {
//   return moves[y].substr(x, 1);
// }
function getMoves(x, y) { //return ALL moves (up, down, left, right) from given pos
  var moves = [];
  moves.push({ x: x + 1, y }); //right [0]
  moves.push({ x: x, y: y - 1 }); //up [1]
  moves.push({ x: x - 1, y: y }); // left [2]
  moves.push({ x: x, y: y + 1 }); //down [3]
  // console.log('getMoves: ' + moves[0].x + ',' + moves[0].y + ' ' + moves[1].x + ',' + moves[1].y + ' ' + moves[2].x + ',' + moves[2].y + ' ' + moves[3].x + ',' + moves[3].y);
  return moves;
}

function lastStep(y) { //checks if it is a tile from bottom row 
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
  // carvePath(10, 0);
  var firstX = firstStep();
  console.log('firstX = ' + firstX);
  // validMoves(firstX, 1);
  carvePath(firstX);
  printMaze();
}

init();
// var v = validMove(0, 1);
// console.log('0, 1: ' + 'x: ' + v.x + ' y: ' + v.y);
// v = validMove(3, 3);
// console.log('3, 3: ' + 'x: ' + v.x + ' y: ' + v.y);
