/**
 * Dijkstra's algorithm to find the shortest path between two stations in the player's network.
 */
export function findShortestPath(graph, startId, endId) {
  const distances = {};
  const previous = {};
  const nodes = new Set();

  for (let station of graph.stations) {
    if (station.id === startId) {
      distances[station.id] = 0;
    } else {
      distances[station.id] = Infinity;
    }
    previous[station.id] = null;
    nodes.add(station.id);
  }

  while (nodes.size > 0) {
    let closestNode = null;
    for (let nodeId of nodes) {
      if (!closestNode || distances[nodeId] < distances[closestNode]) {
        closestNode = nodeId;
      }
    }

    if (distances[closestNode] === Infinity) break;

    if (closestNode === endId) {
      const path = [];
      let curr = endId;
      while (curr) {
        path.push(curr);
        curr = previous[curr];
      }
      return { path: path.reverse(), distance: distances[endId] };
    }

    nodes.delete(closestNode);

    for (let neighbor of graph.getNeighbors(closestNode)) {
      let alt = distances[closestNode] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        previous[neighbor.node] = closestNode;
      }
    }
  }

  return { path: [], distance: Infinity };
}
