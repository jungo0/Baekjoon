const solution = (board) => {
  const queue = [];
  const N = board.length;
  const goal = (N + "" + N).toString();
  const newBoard = Array.from(Array(N + 2), () => Array(N + 2).fill(1));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      newBoard[i + 1][j + 1] = board[i][j];
    }
  }
  queue.push({ head: [1, 1], tail: [1, 2], dist: 0 });
  const visit = new Set(["1112"]);
  while (queue.length > 0) {
    const { head, tail, dist } = queue.shift();
    if (head.join("") === goal || tail.join("") === goal) return dist;
    const nextPos = getNextPos(head, tail, newBoard, dist, visit);
    for (const next of nextPos) {
      const { head: nextHead, tail: nextTail } = next;
      if (!visit.has(nextHead.join("") + nextTail.join(""))) {
        visit.add(nextHead.join("") + nextTail.join(""));
        queue.push(next);
      }
    }
  }
};

const getNextPos = ([x1, y1], [x2, y2], board, dist) => {
  const arr = [];
  const dir = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  dir.forEach(([X, Y]) => {
    const head = [x1 + X, y1 + Y];
    const tail = [x2 + X, y2 + Y];
    if (board[head[0]][[head[1]]] === 0 && board[tail[0]][[tail[1]]] === 0)
      arr.push({ head, tail, dist: dist + 1 });
  });
  const rotate = [1, -1];
  rotate.forEach((value) => {
    if (x1 === x2) {
      //가로로 위치한 경우
      if (board[x1 + value][y1] === 0 && board[x2 + value][y2] === 0) {
        arr.push({ head: [x1, y1], tail: [x1 + value, y1], dist: dist + 1 });
        arr.push({ head: [x2 + value, y2], tail: [x2, y2], dist: dist + 1 });
      }
    } else {
      // 세로로 위치한 경우
      if (board[x1][y1 + value] === 0 && board[x2][y2 + value] === 0) {
        arr.push({ head: [x1, y1], tail: [x1, y1 + value], dist: dist + 1 });
        arr.push({ head: [x2, y2 + value], tail: [x2, y2], dist: dist + 1 });
      }
    }
  });
  return arr;
};