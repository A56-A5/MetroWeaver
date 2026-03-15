# MetroWeaver: Subway Architect

MetroWeaver is a professional subway network planning simulator based on graph theory. Design efficient transit systems, manage budgets in Rupees (₹), and optimize for maximum connectivity and minimal cost.

**Live Demo (if deployed)**: [GitHub Repository](https://github.com/A56-A5/MetroWeaver)

## 🏙️ Features

- **Dynamic City Generation**: Randomly placed stations across a 2D map.
- **Real-time Pathfinding**: Passengers (red dots) use Dijkstra's algorithm to find the shortest path between stations.
- **Theoretical Optimization**: Compare your network against the **Minimum Spanning Tree (MST)** using Prim's algorithm.
- **Budget Management**: Realistic construction costs based on Euclidean distances.
- **Professional Aesthetics**: Clean, industrial slate-and-white grid theme.
- **Mobile Responsive**: Fully adaptive UI for all device sizes.

## 🕹️ How to Play

1. **Select Station**: Click on a station node to select it.
2. **Build Track**: Click another station to build a track. The cost (₹) depends on the distance.
3. **Monitor Efficiency**: Your efficiency score compares your current network cost to the theoretical minimum (MST).
4. **Analyze**: Use the "Analyze Network" tool to visualize the optimal theoretical paths and view performance stats.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Industrial Theme)
- **Algorithms**: Prim's (MST), Dijkstra's (Shortest Path)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/A56-A5/MetroWeaver.git
   ```
2. Navigate to the project directory:
   ```bash
   cd MetroWeaver
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📐 Algorithmic Background

- **Graph Theory**: Stations are nodes (vertices), and tracks are edges.
- **MST (Minimum Spanning Tree)**: The cheapest possible way to connect all nodes. MetroWeaver uses Prim's algorithm to calculate this baseline.
- **Dijkstra's Algorithm**: Used to calculate the shortest path for passengers traveling through the network.

---
Created with ❤️ by [A56-A5](https://github.com/A56-A5)
