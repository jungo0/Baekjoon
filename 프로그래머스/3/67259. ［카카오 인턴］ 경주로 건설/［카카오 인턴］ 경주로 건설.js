const EMPTY = 0;
const WALL = 1;

const STRAIGHT_COST = 100;
const CORNER_COST = 500 + STRAIGHT_COST;

const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];

let N;

function isValid(row, col) {
  return 0 <= row && row < N && 0 <= col && col < N;
}

function bfs(board) {
  const queue = [];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => Array(4).fill(Infinity))
  );

  if (board[1][0] === EMPTY) {
    queue.push([1, 0, 2, STRAIGHT_COST]);
    visited[1][0][2] = STRAIGHT_COST;
  }
  if (board[0][1] === EMPTY) {
    queue.push([0, 1, 1, STRAIGHT_COST]);
    visited[0][1][1] = STRAIGHT_COST;
  }

  while (queue.length > 0) {
    const [curRow, curCol, curDir, curCost] = queue.shift();

    for (let d = 0; d < 4; d++) {
      const nr = curRow + dr[d];
      const nc = curCol + dc[d];

      if (!isValid(nr, nc)) {
        continue;
      }
      if (board[nr][nc] === WALL) {
        continue;
      }

      const newCost =
        curDir === d ? curCost + STRAIGHT_COST : curCost + CORNER_COST;

      if (visited[nr][nc][d] <= newCost) {
        continue;
      }

      visited[nr][nc][d] = newCost;
      queue.push([nr, nc, d, newCost]);
    }
  }

  let minCost = Math.min(...visited[N - 1][N - 1]);
  return minCost;
}

function solution(board) {
  N = board.length;

  let minCost = bfs(board);
  return minCost;
}