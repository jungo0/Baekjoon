// 90도 시계 방향 회전 함수
const rotate = (matrix) => {
    const m = matrix.length;
    const result = Array.from({ length: m }, () => Array(m).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) {
            result[j][m - 1 - i] = matrix[i][j];
        }
    }
    return result;
};

// 자물쇠 중앙 부분이 모두 1(홈과 돌기가 일치)인지 검사하는 함수
const isUnlocked = (board, lockLen, keyLen) => {
    for (let i = 0; i < lockLen; i++) {
        for (let j = 0; j < lockLen; j++) {
            if (board[keyLen - 1 + i][keyLen - 1 + j] !== 1) {
                return false;
            }
        }
    }
    return true;
};

function solution(key, lock) {
    const M = key.length;
    const N = lock.length;
    const boardSize = N + (M - 1) * 2;
    
    // 3배 확장된 자물쇠 판 생성
    const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

    // 패딩된 판 중앙에 원래 자물쇠 배치
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            board[M - 1 + i][M - 1 + j] = lock[i][j];
        }
    }

    let currentKey = key;

    // 4가지 회전 방향 탐색
    for (let rot = 0; rot < 4; rot++) {
        currentKey = rotate(currentKey);

        // 열쇠를 이동시킬 수 있는 모든 x, y 위치 탐색
        for (let x = 0; x <= boardSize - M; x++) {
            for (let y = 0; y <= boardSize - M; y++) {

                // 1. 자물쇠 판에 열쇠를 더함
                for (let i = 0; i < M; i++) {
                    for (let j = 0; j < M; j++) {
                        board[x + i][y + j] += currentKey[i][j];
                    }
                }

                // 2. 자물쇠가 열렸는지 확인
                if (isUnlocked(board, N, M)) {
                    return true;
                }

                // 3. 열리지 않았다면 원상복구 (더했던 열쇠 값을 차감)
                for (let i = 0; i < M; i++) {
                    for (let j = 0; j < M; j++) {
                        board[x + i][y + j] -= currentKey[i][j];
                    }
                }
            }
        }
    }

    return false;
}