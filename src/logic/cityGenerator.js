/**
 * Generates a random set of stations for the game.
 */
export function generateCity(count, width, height) {
  const stations = [];
  const padding = 50;

  for (let i = 0; i < count; i++) {
    stations.push({
      id: `st-${i}`,
      name: `Station ${String.fromCharCode(65 + i)}`,
      x: Math.random() * (width - 2 * padding) + padding,
      y: Math.random() * (height - 2 * padding) + padding,
    });
  }

  return stations;
}
