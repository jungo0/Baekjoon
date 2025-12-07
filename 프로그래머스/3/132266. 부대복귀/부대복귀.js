function solution(n, roads, sources, destination) {
  const answer = [];
  const road = Array.from({ length: n + 1 }, () => []);
  const level = Array.from({ length: n + 1 }, () => Infinity);
  const que = [destination];
  roads.forEach(([st, ed], i) => {
    road[st].push(ed);
    road[ed].push(st);
  })
    
  level[destination] = 0;
    
  while (que.length > 0) {
    const cur = que.shift();
    for (let i = 0; i < road[cur].length; i++) {
      if (level[cur] + 1 < level[road[cur][i]]) {
        level[road[cur][i]] = level[cur] + 1;
        que.push(road[cur][i]);
      }
    }
  }
    
  sources.forEach(e => {
    answer.push(level[e] === Infinity ? -1 : level[e]);
  })
  return answer;
}
