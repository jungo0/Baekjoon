const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

function solution (land, height) {
  const len = land.length;
  const board = new Array(len+2).fill().map(_ => new Array(len+2).fill(0));
  const visited = new Array(len+2).fill().map(_ => new Array(len+2).fill(-1));
  
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      board[i+1][j+1] = land[i][j];
      visited[i+1][j+1] = 0;
    }
  }
  
  let groupNum = 1;
  for (let i = 0; i < len+2; i++) {
    for (let j = 0; j < len+2; j++) {
      if (!visited[i][j]) {
        groupLandWithBFS(i, j, board, visited, height, groupNum++);
      }
    }
  }
  
  const posInfoWithDistance = [];
  for (let i = 0; i < len+2; i++) {
    for (let j = 0; j < len+2; j++) {
      for (let k = 0; k < 4; k++) {
        const ny = i + dy[k];
        const nx = j + dx[k];
        
        if (visited[i][j] !== -1 && visited[ny][nx] !== -1 &&
           visited[i][j] !== visited[ny][nx]) {
          const distance = Math.abs(board[ny][nx] - board[i][j]);
          posInfoWithDistance.push([distance, [visited[i][j], visited[ny][nx]]]);
        }
      }
    }
  }
  
  posInfoWithDistance.sort((a, b) => a[0] - b[0]);
  
  const parents = new Array(groupNum-1).fill(0);
  for (let i = 1; i < groupNum; i++) {
    parents[i] = i;
  }
  
  let answer = 0;
  for (const node of posInfoWithDistance) {
    const [ distance, [ e1, e2 ] ] = node;
    
    if (!isSameParent(parents, e1, e2)) {
      answer += distance;
      unionParent(parents, e1, e2);
    }
  }
  
  return answer;
}

const groupLandWithBFS = (y, x, board, visited, height, groupNum) => {
  const queue = [ [y, x] ];
  visited[y][x] = groupNum;
  
  while(queue.length) {
    const [y, x] = queue.shift();
    const cur = board[y][x];
    
    for(let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      const distance = Math.abs(board[ny][nx] - cur);
      
      if (!visited[ny][nx]) {
        if (distance <= height) {
          visited[ny][nx] = groupNum;
          queue.push([ny, nx]);
        }
      }
    }
  }
}

const findParent = (arr, n) => {
  if (arr[n] === n) return n;
  return findParent(arr, arr[n]);
}

const unionParent = (arr, a, b) => {
  a = findParent(arr, a);
  b = findParent(arr, b);
  if (a < b) arr[b] = a;
  else arr[a] = b;
}

const isSameParent = (arr, a, b) => {
  a = findParent(arr, a);
  b = findParent(arr, b);
  return a === b;
}
      