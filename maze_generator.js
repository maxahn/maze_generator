"use strict";
const WALL = '\u56c1';
const EMPTY = '\u56d7';
class MazeGenerator {
  constructor(width, height) {
    this.width = width || 50;
    this.height = height || 50;
  }
  get (width) {
    return this.width;
  }
  get(height) {
    return this.height;
  }
  static get wall() {
    return WALL;
  }
  static get empty() {
    return EMPTY;
  }
}
module.exports = MazeGenerator;
