var wall = '\u2588';

var empty = ' ';

var width = process.argv[2];
var height = process.argv[3];

function generateMaze(width, height) {
  var maze = [];
  for (var count = height; height > 0; height--) {
    var mazeString = '';
    for (var counter= width; counter > 0; counter--) {
      var randomNum = Math.random();
      if (randomNum <= 0.7) {
        mazeString = mazeString + wall;
      } else {
        mazeString = mazeString + empty; 
      }
    }
    maze.push(mazeString);
  }
  return maze;
}

function mainPath(width, height) {
  var maze = [];
  var mazeString = wall.repeat(width);
  for (var i = 0; i < height; i++) {
    maze.push(mazeString); 
  } 

  var ranNum = Math.floor(Math.random() * 100) % width;
  var firstMazeString = maze[0];
  firstMazeString = firstMazeString.substring(0, ranNum - 1) + empty + firstMazeString.substring(ranNum, firstMazeString.length);
  maze[0] = firstMazeString;
  console.log('math: ' + ranNum)

  prettyPrint(maze);
  surroundingValidPos(ranNum - 1, 0);
  canCarve(ranNum - 1, 0);
  for (var i = 1; i < maze.length; i++) {
    mazeString = maze[i];
  }
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
    console.log(move.dir);
    return move.dir === 'down'
  });
  var leftValid = moves.find(function(move) {
    console.log(move.dir);
    return move.dir === 'left'
  });
  var rightValid = moves.find(function(move) {
    console.log(move.dir);
    return move.dir === 'right'
  });
  return downValid !== undefined && upValid !== undefined && leftValid !== undefined && rightValid !== undefined;
}

function prettyPrint(maze) {
  for (var counter = 0; counter < maze.length; counter++) {
    console.log(maze[counter]);
  }
}
mainPath(20,20);
// prettyPrint(generateMaze(width, height));
