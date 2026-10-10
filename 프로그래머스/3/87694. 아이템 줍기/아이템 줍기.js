function solution(rectangle, characterX, characterY, itemX, itemY) {
    const size = 102;
    // 0: 빈 공간, 1: 테두리, 2: 내부
    const board = Array.from({ length: size }, () => Array(size).fill(0));

    // 1. 직사각형 채우기 (2배 확대)
    for (const [lx, ly, rx, ry] of rectangle) {
        const x1 = lx * 2, y1 = ly * 2;
        const x2 = rx * 2, y2 = ry * 2;

        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                // 이미 다른 직사각형의 내부(2)로 판정된 곳은 덮어쓰지 않음
                if (board[x][y] === 2) continue;

                // 테두리면 1, 내부면 2
                if (x === x1 || x === x2 || y === y1 || y === y2) {
                    board[x][y] = 1;
                } else {
                    board[x][y] = 2;
                }
            }
        }
    }

    // 2. BFS 탐색
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    const visited = Array.from({ length: size }, () => Array(size).fill(0));

    const startX = characterX * 2;
    const startY = characterY * 2;
    const targetX = itemX * 2;
    const targetY = itemY * 2;

    const queue = [[startX, startY]];
    visited[startX][startY] = 1;

    while (queue.length > 0) {
        const [x, y] = queue.shift();

        if (x === targetX && y === targetY) {
            // 2배 확대한 상태이므로 나누기 2 (시작 카운팅 1 제외)
            return Math.floor((visited[x][y] - 1) / 2);
        }

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
            if (visited[nx][ny] > 0) continue;
            
            // 테두리(1)인 경로만 이동
            if (board[nx][ny] === 1) {
                visited[nx][ny] = visited[x][y] + 1;
                queue.push([nx, ny]);
            }
        }
    }

    return 0;
}