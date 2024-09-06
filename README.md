# Conway's Game of Life

This project is an implementation of John Conway's Game of Life, a cellular automaton where cells in a grid evolve through generations based on a set of simple rules. The Game of Life is a zero-player game, meaning that its evolution is determined by its initial state with no further input required.

## Features

- **Customizable Grid Size**: The grid dimensions can be easily adjusted to any size.
- **Random Initial State**: The grid is initialized with a random distribution of live cells.
- **Automatic Updates**: The game state updates automatically every 5 seconds.
- **Interactive Cell Updates**: The ability to update the state of individual cells (alive or dead) manually.

## Rules of the Game

1. **Birth**: A dead cell with exactly three live neighbors becomes a live cell (birth).
2. **Survival**: A live cell with two or three live neighbors stays alive (survival).
3. **Death by Overpopulation**: A live cell with more than three live neighbors dies (overpopulation).
4. **Death by Isolation**: A live cell with fewer than two live neighbors dies (isolation).

## Game preview

[![Watch the video](https://raw.githubusercontent.com/aleksmilev/Game-of-life/blob/main/gameplay/preview.png)](https://raw.githubusercontent.com/aleksmilev/Game-of-life/blob/main/gameplay/gameplay.mp4)