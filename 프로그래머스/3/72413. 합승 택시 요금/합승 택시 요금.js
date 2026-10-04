function solution(n, s, a, b, fares) {
    // 1. 그래프 초기화 (1-indexed -> 0-indexed 변환)
    const board = Array.from({ length: n }, () => Array(n).fill(Infinity));
    
    for (let i = 0; i < n; i++) {
        board[i][i] = 0;
    }
    
    for (const [x, y, weight] of fares) {
        board[x - 1][y - 1] = weight;
        board[y - 1][x - 1] = weight;
    }
    
    // 2. 플로이드-워셜 알고리즘으로 모든 쌍 최단 거리 계산
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (board[i][j] > board[i][k] + board[k][j]) {
                    board[i][j] = board[i][k] + board[k][j];
                }
            }
        }
    }
    
    // 3. 최적의 합승 지점 i 탐색
    let answer = Infinity;
    for (let i = 0; i < n; i++) {
        const cost = board[s - 1][i] + board[i][a - 1] + board[i][b - 1];
        answer = Math.min(answer, cost);
    }
    
    return answer;
}