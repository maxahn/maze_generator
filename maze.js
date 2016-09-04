var wall = '\u2588';

var empty = ' ';

var width = process.argv[2];
var height = process.argv[3];

function generateMaze(width, height) {
  var maze = [];
  var mazeString = wall.repeat(width);
  for (var i = 0; i < height; i++) {
    maze.push(mazeString); 
  } 
  prettyPrint(mainPath(maze, width, height));
}

function mainPath(maze, width, height) {
  var ranNum = Math.floor(Math.random() * 100) % width;
  var firstMazeString = maze[0];
  firstMazeString = firstMazeString.substring(0, ranNum - 1) + empty + firstMazeString.substring(ranNum, firstMazeString.length);
  maze[0] = firstMazeString;

  surroundingValidPos(ranNum - 1, 0);
  canCarve(ranNum - 1, 0);
  for (var i = 1; i < maze.length; i++) {
    mazeString = maze[i];
  }
  return maze;
}

function surroundingValidPos(x, y) { //first time pass in 0,3 for example 
  var moves = [];//.push(up).push(down).push(left).push(right);

  (y >= 1) ? moves.push({dir: 'up', x: x, y: y - 1}) : 'blah'; 
  (y <= height - 2) ? moves.push({dir: 'down', x: x, y: y + 1}) : 'blah'; 
  (x >= 1) ? moves.push({dir: 'left', x: x - 1, y: y}) : 'blah';
  (x <= width - 2) ? moves.push({dir: 'right', x:  x + 1, y: y}) : 'blah';
  // for (var i = 0; i < moves.length; i++) { //printing out 
  //   var move = moves[i];
  //   console.log('dir: ' + move.dir + ' x: ' + move.x + ' y: ' + move.y);
  // }
  return moves;
} 

function canCarve(x, y) {
  var moves = surroundingValidPos(x, y); 
  var upValid = moves.find(function(move) {
    return move.dir === 'up';
  });
  var downValid = moves.find(function(move) {
    return move.dir === 'down'
  });
  var leftValid = moves.find(function(move) {
    return move.dir === 'left'
  });
  var rightValid = moves.find(function(move) {
    return move.dir === 'right'
  });
  return downValid !== undefined && upValid !== undefined && leftValid !== undefined && rightValid !== undefined;
}


function prettyPrint(maze) {
  for (var counter = 0; counter < maze.length; counter++) {
    console.log(maze[counter]);
  }
}
// prettyPrint(generateMaze(width, height));
generateMaze(width, height);
