const solution = (board) => {
    const N = board.length;
    // 패딩을 준 맵 생성 (외곽 벽 처리 편의성)
    const newBoard = Array.from(Array(N + 2), () => Array(N + 2).fill(1));
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            newBoard[i + 1][j + 1] = board[i][j];
        }
    }

    const getStateKey = (p1, p2) => {
        if (p1[0] < p2[0] || (p1[0] === p2[0] && p1[1] < p2[1])) {
            return `${p1[0]},${p1[1]}-${p2[0]},${p2[1]}`;
        }
        return `${p2[0]},${p2[1]}-${p1[0]},${p1[1]}`;
    };

    const queue = [{ p1: [1, 1], p2: [1, 2], dist: 0 }];
    const visit = new Set([getStateKey([1, 1], [1, 2])]);

    while (queue.length > 0) {
        const { p1, p2, dist } = queue.shift();

        if ((p1[0] === N && p1[1] === N) || (p2[0] === N && p2[1] === N)) {
            return dist;
        }

        const nextPositions = getNextPos(p1, p2, newBoard);
        for (const next of nextPositions) {
            const key = getStateKey(next.p1, next.p2);
            if (!visit.has(key)) {
                visit.add(key);
                queue.push({ p1: next.p1, p2: next.p2, dist: dist + 1 });
            }
        }
    }
};

const getNextPos = (p1, p2, board) => {
    const arr = [];
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    // 1. 상하좌우 평행 이동
    for (let i = 0; i < 4; i++) {
        const np1 = [p1[0] + dx[i], p1[1] + dy[i]];
        const np2 = [p2[0] + dx[i], p2[1] + dy[i]];

        if (board[np1[0]][np1[1]] === 0 && board[np2[0]][np2[1]] === 0) {
            arr.push({ p1: np1, p2: np2 });
        }
    }

    // 2. 회전 이동
    // 가로로 놓여있는 경우 (y축이 다름)
    if (p1[0] === p2[0]) {
        const row = p1[0];
        for (const dir of [-1, 1]) { // 위쪽, 아래쪽으로 회전
            // 축을 기준으로 위/아래 칸들이 모두 비어있어야 함
            if (board[row + dir][p1[1]] === 0 && board[row + dir][p2[1]] === 0) {
                arr.push({ p1: [row, p1[1]], p2: [row + dir, p1[1]] }); // p1을 축으로 회전
                arr.push({ p1: [row, p2[1]], p2: [row + dir, p2[1]] }); // p2를 축으로 회전
            }
        }
    } 
    // 세로로 놓여있는 경우 (x축이 다름)
    else if (p1[1] === p2[1]) {
        const col = p1[1];
        for (const dir of [-1, 1]) { // 왼쪽, 오른쪽으로 회전
            if (board[p1[0]][col + dir] === 0 && board[p2[0]][col + dir] === 0) {
                arr.push({ p1: [p1[0], col], p2: [p1[0], col + dir] }); // p1을 축으로 회전
                arr.push({ p1: [p2[0], col], p2: [p2[0], col + dir] }); // p2를 축으로 회전
            }
        }
    }

    return arr;
};