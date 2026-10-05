function find(node, parent) {
  if (parent[node] === node) return node;
  return (parent[node] = find(parent[node], parent));
}

function union(nodeA, nodeB, parent) {
  const rootA = find(nodeA, parent);
  const rootB = find(nodeB, parent);

  if (rootA !== rootB) {
    if (rootA < rootB) parent[rootB] = rootA;
    else parent[rootA] = rootB;
    return true; // 성공적으로 연결됨
  }
  return false; // 이미 연결되어 있음
}

function solution(n, costs) {
  const sortedCosts = [...costs].sort((a, b) => a[2] - b[2]);

  const parent = Array.from({ length: n }, (_, i) => i);

  let totalCost = 0;
  let bridgeCount = 0;

  for (const [a, b, cost] of sortedCosts) {
    // 사이클이 형성되지 않는 경우에만 다리 건설
    if (union(a, b, parent)) {
      totalCost += cost;
      bridgeCount++;

      // 연결된 다리 수가 n - 1개가 되면 모든 섬이 연결된 것
      if (bridgeCount === n - 1) break;
    }
  }

  return totalCost;
}