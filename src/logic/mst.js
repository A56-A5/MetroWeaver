import { calculateDistance } from './graph';

/**
 * Prim's algorithm to find the Minimum Spanning Tree (MST).
 * Returns the total cost of the optimal network.
 */
export function calculateMST(stations) {
  if (stations.length === 0) return 0;

  const n = stations.length;
  const visited = new Array(n).fill(false);
  const minEdge = new Array(n).fill(Infinity);
  const parent = new Array(n).fill(-1);
  minEdge[0] = 0;
  let totalCost = 0;
  const edges = [];

  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let v = 0; v < n; v++) {
      if (!visited[v] && (u === -1 || minEdge[v] < minEdge[u])) {
        u = v;
      }
    }

    if (minEdge[u] === Infinity) break;

    visited[u] = true;
    totalCost += minEdge[u];
    if (parent[u] !== -1) {
      edges.push({ u: stations[parent[u]].id, v: stations[u].id, weight: minEdge[u] });
    }

    for (let v = 0; v < n; v++) {
      if (!visited[v]) {
        const dist = calculateDistance(stations[u], stations[v]);
        if (dist < minEdge[v]) {
          minEdge[v] = dist;
          parent[v] = u;
        }
      }
    }
  }

  return { totalCost, edges };
}
