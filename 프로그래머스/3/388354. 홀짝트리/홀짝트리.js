function solution(nodes, edges) {
    const N = nodes.length
    const parent = Array(N).fill(0).map((_, i) => i);
    
    const find = (a) => {
        if (parent[a] === a) return a;
        return parent[a] = find(parent[a]);
    }
    
    const union = (a, b) => {
        const rootA = find(a);
        const rootB = find(b);
        
        if (rootA !== rootB) {
            parent[rootB] = rootA
        }
    }
    
    // 각 노드들의 자식 수 알아야 함
    const nodeToIndex = new Map();
    const degree = Array(N).fill(0);
    nodes.forEach((node, idx) => nodeToIndex.set(node, idx));

    edges.forEach(([x, y]) => {
        const u = nodeToIndex.get(x);
        const v = nodeToIndex.get(y);
        degree[u] += 1
        degree[v] += 1
    });

    edges.forEach(([x, y]) => {
        const u = nodeToIndex.get(x);
        const v = nodeToIndex.get(y);
        union(u, v);
    });
    
    const rootGroup = Array(N).fill(0); // 루트 그룹 카운트 초기화
    const nonRootGroup = Array(N).fill(0); // 비루트 그룹 카운트 초기화
    
    nodes.forEach((node, idx) => {
        const v = find(idx);
        if ((node % 2) === (degree[idx] % 2)) rootGroup[v] += 1;
        else nonRootGroup[v] += 1;
    })
    
    let hTreeCount = 0; // 홀짝 트리 카운트
    let rTreeCount = 0; // 역홀짝 트리 카운트

    for (let i = 0; i < N; i++) {
        if (find(i) !== i) continue;

        if (rootGroup[i] === 1) hTreeCount++;
        if (nonRootGroup[i] === 1) rTreeCount++;
    }
    return [hTreeCount, rTreeCount];
}