function solution(n, edge) {
  const graph = Array.from(Array(n + 1), () => []);

  for (let [from, to] of edge) {
    graph[from].push(to);
    graph[to].push(from);
  }

  const visited = Array(n + 1).fill(false);
  const queue = [1];
  visited[1] = 1;

  while (queue.length) {
    const current = queue.shift();
    for (const next of graph[current]) {
      if (!visited[next]) {
        visited[next] = visited[current] + 1;
        queue.push(next);
      }
    }
  }
  const max = Math.max(...visited);
  return visited.filter((v) => v === max).length;
}
