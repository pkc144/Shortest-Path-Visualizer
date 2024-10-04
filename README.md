# Shortest Path Visualizer

An interactive web application developed using React.js to visualize Dijkstra’s algorithm in a grid-based environment. It enables real-time visualization of the shortest path-finding process and allows users to create walls and barriers between nodes.


## 📊 Features

- **Interactive Grid**: Create start and end nodes and design obstacles on the grid.
- **Real-time Visualization**: Watch how Dijkstra’s algorithm finds the shortest path step-by-step.
- **User-Friendly Interface**: Easy-to-use controls and intuitive design for creating custom pathfinding scenarios.

## 🛠️ Technologies Used

-   HTML5
-   CSS3
-   JavaScript (ES6)
-   React.js
-   Dijkstra’s Algorithm

## 🚀 Installation & Setup

To run this project locally, follow these steps:

- git clone https://github.com/your-username/shortest-path-visualizer.git
- cd shortest-path-visualizer
- npm install
- npm start

## 🎯 How to Use

-   **Select Start and End Nodes**: Click on the grid to set the start and end nodes.
-   **Create Walls/Barriers**: Click or drag on the grid cells to create obstacles that Dijkstra’s algorithm should navigate around.
-   **Visualize the Pathfinding**: Click on the **"Visualize Dijkstra"** button to see the algorithm in action.
-   **Clear the Board**: Use the reset button to clear the board and start over.

## 📚 Algorithm Explanation

Dijkstra’s algorithm is a popular pathfinding algorithm that finds the shortest path between a source node and a destination node. It uses a priority queue to expand nodes with the smallest distance from the source, making it optimal for weighted graphs without negative edge weights.
