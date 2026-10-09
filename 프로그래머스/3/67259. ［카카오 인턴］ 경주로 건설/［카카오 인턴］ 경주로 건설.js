class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    this._up();
  }
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._down();
    return top;
  }
  _up() {
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[p][3] <= this.heap[i][3]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }
  _down() {
    let i = 0;
    const len = this.heap.length;
    while (i * 2 + 1 < len) {
      let left = i * 2 + 1, right = i * 2 + 2, min = left;
      if (right < len && this.heap[right][3] < this.heap[left][3]) min = right;
      if (this.heap[i][3] <= this.heap[min][3]) break;
      [this.heap[i], this.heap[min]] = [this.heap[min], this.heap[i]];
      i = min;
    }
  }
  size() {
    return this.heap.length;
  }
}

function solution(board) {
  const N = board.length;
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  
  // visited[row][col][dir]
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => Array(4).fill(Infinity))
  );

  const pq = new MinHeap();

  // (0, 0)에서 시작할 때 가능한 모든 방향으로 탐색 초기화
  // [row, col, dir, cost]
  for (let d = 0; d < 4; d++) {
    const nr = dr[d];
    const nc = dc[d];
    if (nr >= 0 && nr < N && nc >= 0 && nc < N && board[nr][nc] === 0) {
      visited[nr][nc][d] = 100;
      pq.push([nr, nc, d, 100]);
    }
  }

  while (pq.size() > 0) {
    const [r, c, dir, cost] = pq.pop();

    if (cost > visited[r][c][dir]) continue;
    if (r === N - 1 && c === N - 1) return cost;

    for (let d = 0; d < 4; d++) {
      const nr = r + dr[d];
      const nc = c + dc[d];

      if (nr < 0 || nr >= N || nc < 0 || nc >= N || board[nr][nc] === 1) continue;

      // 같은 방향이면 100원, 꺾이면 600원(직선 100 + 코너 500)
      const nextCost = cost + (dir === d ? 100 : 600);

      if (nextCost < visited[nr][nc][d]) {
        visited[nr][nc][d] = nextCost;
        pq.push([nr, nc, d, nextCost]);
      }
    }
  }

  return Math.min(...visited[N - 1][N - 1]);
}