
import React, { Component } from 'react';
import logo from '../PathfindingVisualizer/Google_Maps_Logo_2020.svg.png';
import Node from './Node/Node'; // Ensure the Node component is correctly set up
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import './PathfindingVisualizer.css';

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      isSelectingStart: false,
      isSelectingFinish: false,
      startNode: { row: 10, col: 15 },
      finishNode: { row: 10, col: 35 },
    };
  }

  componentDidMount() {
    const grid = getInitialGrid(this.state.startNode, this.state.finishNode);
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const { isSelectingStart, isSelectingFinish, startNode, finishNode } = this.state;

    if (isSelectingStart) {
      const newStartNode = { row, col };
      const grid = getInitialGrid(newStartNode, finishNode);
      this.setState({ startNode: newStartNode, grid, isSelectingStart: false });
      return;
    }

    if (isSelectingFinish) {
      const newFinishNode = { row, col };
      const grid = getInitialGrid(startNode, newFinishNode);
      this.setState({ finishNode: newFinishNode, grid, isSelectingFinish: false });
      return;
    }

    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleSelectStart() {
    this.setState({ isSelectingStart: true });
  }

  handleSelectFinish() {
    this.setState({ isSelectingFinish: true });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid, startNode, finishNode } = this.state;
    const start = grid[startNode.row][startNode.col];
    const finish = grid[finishNode.row][finishNode.col];
    const visitedNodesInOrder = dijkstra(grid, start, finish);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed, isSelectingStart, isSelectingFinish } = this.state;

    return (
      <>
        {/* <div className="logo">
          <img src={logo} width="100" height="50" alt="logo" />
        </div> */}
        <div style={{padding: "10px"}} className="buttons">
          <button className="visualize-btn" onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra's Algorithm
          </button>
          <button
            className={isSelectingStart ? "start-btn selecting" : "start-btn"}
            onClick={() => this.handleSelectStart()}
          >
            {isSelectingStart ? 'Selecting Start Node...' : 'Select Start Node'}
          </button>
          <button
            className={isSelectingFinish ? "finish-btn selecting" : "finish-btn"}
            onClick={() => this.handleSelectFinish()}
          >
            {isSelectingFinish ? 'Selecting Finish Node...' : 'Select Finish Node'}
          </button>
        </div>
        <div style={{padding: "-20px"}} className="grid">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                    onMouseUp={() => this.handleMouseUp()}
                    row={row}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </>
    );
  }
}

const getInitialGrid = (startNode, finishNode) => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row, startNode, finishNode));
    }
    grid.push(currentRow);
  }
  return grid;
};



const createNode = (col, row, startNode, finishNode) => {
  return {
    col,
    row,
    isStart: row === startNode.row && col === startNode.col,
    isFinish: row === finishNode.row && col === finishNode.col,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};


