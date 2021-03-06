// @flow

export const randomColor = () => {
    const h = Math.random() * 6;
    const i = ~~h;
    const f = h - i;
    const q = 1 - f;
    const rgb = mod => {
      switch (mod) {
        case 0: return [1,f,0];
        case 1: return [q, 1, 0];
        case 2: return [0, 1, f];
        case 3: return [0, q, 1];
        case 4: return [f, 0, 1];
        default: return [1, 0, q];
      }
    }
    const [r, g, b] = rgb(i%6);
    return "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
}

// Input ranks keyed by playerId, for a single hole.
// Output points keyed by playerId
export const ranksToPoints = (ranks: $ReadOnlyMap<number, number>) : $ReadOnlyMap<number, number> => {
  const result = new Map();
  for (const [playerId, rank] of ranks) {
    const betterThan = [...ranks.values()].filter((rank2 : number) => rank <= rank2).length - 1;
    const equalTo = [...ranks.values()].filter(rank2 => rank === rank2).length - 1;
    result.set(playerId, betterThan - equalTo * 0.5);
  }
  return result;
}
