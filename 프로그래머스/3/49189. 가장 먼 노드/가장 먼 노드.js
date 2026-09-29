function solution(n, edge) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [src, dest] of edge) {
        graph[src].push(dest);
        graph[dest].push(src);
    }

    const distance = new Array(n + 1).fill(-1);
    // 3. BFS 탐색 준비 (1번 노드 출발)
    const queue = [1];
    distance[1] = 0; // 시작점 거리는 0

    let head = 0; // shift() 대신 인덱스로 큐 다루기 (시간 복잡도 O(1) 유지)
    
    while (head < queue.length) {
        const current = queue[head++];

        for (const next of graph[current]) {
            if (distance[next] === -1) {
                distance[next] = distance[current] + 1;
                queue.push(next);
            }
        }
    }

    const maxDistance = Math.max(...distance);

    return distance.filter(dist => dist === maxDistance).length;
}