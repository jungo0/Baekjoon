function solution(board) {
  const dir = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const dp = Array.from({ length: board.length }, () => Array.from({ length: board[0].length }, () => Array.from({ length: 4 }, () => Infinity)));
  const que = [[0, 0, 1, 0], [0, 0, 3, 0]];
    
  while (que.length > 0) {
    const [cy, cx, d, cost] = que.shift();
        
    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [cy + dir[i][0], cx + dir[i][1]];
            
      if (ny >= 0 && ny < board.length && nx >= 0 && nx < board[0].length && board[ny][nx] !== 1) {
        const newCost = cost + (i === d ? 100 : 600);
        if (newCost < dp[ny][nx][i]) {
          dp[ny][nx][i] = newCost;
          que.push([ny, nx, i, newCost]);
        }
      }
    }
  }
    
  return Math.min(...dp[board.length - 1][board[0].length - 1]);
}
