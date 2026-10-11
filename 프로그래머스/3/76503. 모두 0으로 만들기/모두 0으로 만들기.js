function solution(a, edges) {
    const n = a.length;
    
    // 전체 가중치의 합이 0인지 먼저 확인 (0이 아니면 애초에 불가능)
    let totalSum = 0n;
    const bigA = new BigInt64Array(n);
    for (let i = 0; i < n; i++) {
        bigA[i] = BigInt(a[i]);
        totalSum += bigA[i];
    }
    if (totalSum !== 0n) return -1;

    const tree = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        tree[u].push(v);
        tree[v].push(u);
    }

    // 부모를 기록하기 위한 배열과 방문 배열
    const parent = new Int32Array(n).fill(-1);
    const order = []; // BFS/DFS로 방문한 순서 기록 (후위 순회를 역으로 하기 위함)
    const visited = new Uint8Array(n);

    const queue = [0];
    visited[0] = 1;
    let head = 0;

    while (head < queue.length) {
        const curr = queue[head++];
        order.push(curr);

        for (const next of tree[curr]) {
            if (!visited[next]) {
                visited[next] = 1;
                parent[next] = curr;
                queue.push(next);
            }
        }
    }

    // 자식부터 루트 방향으로 올라가며 가중치를 부모에게 넘겨줌 (후위 순회 효과)
    let answer = 0n;
    for (let i = n - 1; i >= 0; i--) {
        const curr = order[i];
        const p = parent[curr];

        if (p !== -1) {
            bigA[p] += bigA[curr];
            answer += (bigA[curr] >= 0n ? bigA[curr] : -bigA[curr]);
            bigA[curr] = 0n;
        }
    }

    return bigA[0] === 0n ? answer : -1n;
}