var chai = require('chai');
var expect = chai.expect;
var MazeGenerator = require('./maze_generator.js');

describe('Maze Generator', () => {
  describe('Maze Generator constructor', () => {
    var mazeGen = new MazeGenerator();
    var mazeGenWidthHeight = new MazeGenerator(100, 80) 
    it('should initialize with EMPTY character', () => {
      expect(MazeGenerator.empty).to.equal('\u56d7');
    });
    it('should initialize with WALL character', () => {
      expect(MazeGenerator.wall).to.equal('\u56c1'); 
    });
    it('should initialize with default 50 width if not passed in as an argument', ()  => {
      expect(mazeGen.width).to.equal(50);
    });
    it('should initialize with default 50 height if not passed in as an argument', ()  => {
      expect(mazeGen.height).to.equal(50);
    });
    it('should initialize with 80 height if 80 is passed in as an argument', () => {
      expect(mazeGenWidthHeight.height).to.equal(80);
    });
    it('should initialize with 100 width if 100 is passed in as an argument', () => {
      expect(mazeGenWidthHeight.width).to.equal(100);
    });
  });
}); 
