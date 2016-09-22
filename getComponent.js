var validMoves = require('./maze.js');
//var maze = process.argv[2]; //gets maze passed from maze.js NOTE: this may not be in the format desired, later check what type of object is being passed and convert it to an array of strings if it is anything otherwise
var WALL = '\u56c1';//'\u9641';
var EMPTY  = '\u56d7';//'\u5182';
var maze = [WALL.repeat(2), + EMPTY + WALL.repeat(2), 
            WALL.repeat(2) + EMPTY.repeat(2) + WALL, 
            WALL + EMPTY + WALL + EMPTY + WALL, 
            WALL + EMPTY.repeat(3) + WALL, 
            WALL + EMPTY + WALL.repeat(3)
            ];

console.log(maze);
var start = getStartPoint(maze); 
//=>{ x: num, y: num}
var array = []; //this contains all the valid path coordinates as an array of coordinate objects

function getComponent() { //returns an array of all the vertices that are connected/reachable from given starting point 
//should be a recursive function  
  //base case: reaches end of stack
}

function getStartPoint(maze) { //TODO: write method to find start point 

}
