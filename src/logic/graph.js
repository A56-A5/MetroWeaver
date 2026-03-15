/**
 * Graph data structure for the subway network.
 * Refactored to be more functional-friendly.
 */
export const createGraph = (stations = [], tracks = []) => {
  const adjacencyList = new Map();
  
  stations.forEach(s => adjacencyList.set(s.id, []));
  
  tracks.forEach(track => {
    if (adjacencyList.has(track.u) && adjacencyList.has(track.v)) {
      adjacencyList.get(track.u).push({ node: track.v, weight: track.weight });
      adjacencyList.get(track.v).push({ node: track.u, weight: track.weight });
    }
  });

  return {
    stations,
    tracks,
    adjacencyList,
    getNeighbors(id) {
      return adjacencyList.get(id) || [];
    }
  };
};

export const calculateDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};
