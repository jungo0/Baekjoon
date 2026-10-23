function solution(board) {
    const N = board.length;
    
    // 1. 외곽 벽 패딩 처리 (N+2 x N+2 크기)
    const newBoard = Array.from({ length: N + 2 }, () => Array(N + 2).fill(1));
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            newBoard[r + 1][c + 1] = board[r][c];
        }
    }

    // 2. 방문 처리 (row, col, dir)
    // dir -> 0: 가로 ( (r,c)와 (r, c+1) 차지 ), 1: 세로 ( (r,c)와 (r+1, c) 차지 )
    const visited = Array.from({ length: N + 2 }, () =>
        Array.from({ length: N + 2 }, () => [false, false])
    );

    // 큐 초기화 (r, c, dir, dist)
    const queue = [[1, 1, 0, 0]];
    visited[1][1][0] = true;

    let head = 0; // Array.shift() 대신 인덱스로 접근하여 O(1) 처리

    while (head < queue.length) {
        const [r, c, dir, dist] = queue[head++];

        // 목적지 (N, N) 도달 확인
        // 가로 상태면 (r, c) 또는 (r, c+1)이 (N, N)인지 확인
        // 세로 상태면 (r, c) 또는 (r+1, c)가 (N, N)인지 확인
        if ((r === N && c === N) || 
            (dir === 0 && r === N && c + 1 === N) || 
            (dir === 1 && r + 1 === N && c === N)) {
            return dist;
        }

        const nextStates = getNextStates(r, c, dir, newBoard);

        for (const [nr, nc, ndir] of nextStates) {
            if (!visited[nr][nc][ndir]) {
                visited[nr][nc][ndir] = true;
                queue.push([nr, nc, ndir, dist + 1]);
            }
        }
    }
}

// 이동 및 회전 가능 상태를 반환하는 함수
function getNextStates(r, c, dir, board) {
    const result = [];

    if (dir === 0) {
        // [가로 상태] 기준점: (r, c), 차지하는 칸: (r, c), (r, c+1)
        
        // 1. 상하좌우 평행 이동
        if (board[r - 1][c] === 0 && board[r - 1][c + 1] === 0) result.push([r - 1, c, 0]); // 위
        if (board[r + 1][c] === 0 && board[r + 1][c + 1] === 0) result.push([r + 1, c, 0]); // 아래
        if (board[r][c - 1] === 0) result.push([r, c - 1, 0]); // 좌
        if (board[r][c + 2] === 0) result.push([r, c + 1, 0]); // 우

        // 2. 회전 이동
        // 위쪽 두 칸이 비어있으면 위로 90도 회전하여 세로 상태로 변경
        if (board[r - 1][c] === 0 && board[r - 1][c + 1] === 0) {
            result.push([r - 1, c, 1]);     // (r, c) 기준 위로
            result.push([r - 1, c + 1, 1]); // (r, c+1) 기준 위로
        }
        // 아래쪽 두 칸이 비어있으면 아래로 90도 회전하여 세로 상태로 변경
        if (board[r + 1][c] === 0 && board[r + 1][c + 1] === 0) {
            result.push([r, c, 1]);         // (r, c) 기준 아래로
            result.push([r, c + 1, 1]);     // (r, c+1) 기준 아래로
        }
    } else {
        // [세로 상태] 기준점: (r, c), 차지하는 칸: (r, c), (r+1, c)
        
        // 1. 상하좌우 평행 이동
        if (board[r - 1][c] === 0) result.push([r - 1, c, 1]); // 위
        if (board[r + 2][c] === 0) result.push([r + 1, c, 1]); // 아래
        if (board[r][c - 1] === 0 && board[r + 1][c - 1] === 0) result.push([r, c - 1, 1]); // 좌
        if (board[r][c + 1] === 0 && board[r + 1][c + 1] === 0) result.push([r, c + 1, 1]); // 우

        // 2. 회전 이동
        // 왼쪽 두 칸이 비어있으면 왼쪽으로 90도 회전하여 가로 상태로 변경
        if (board[r][c - 1] === 0 && board[r + 1][c - 1] === 0) {
            result.push([r, c - 1, 0]);     // (r, c) 기준 왼쪽으로
            result.push([r + 1, c - 1, 0]); // (r+1, c) 기준 왼쪽으로
        }
        // 오른쪽 두 칸이 비어있으면 오른쪽으로 90도 회전하여 가로 상태로 변경
        if (board[r][c + 1] === 0 && board[r + 1][c + 1] === 0) {
            result.push([r, c, 0]);         // (r, c) 기준 오른쪽으로
            result.push([r + 1, c, 0]);     // (r+1, c) 기준 오른쪽으로
        }
    }

    return result;
}