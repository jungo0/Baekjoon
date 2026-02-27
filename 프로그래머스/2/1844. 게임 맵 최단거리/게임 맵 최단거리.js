function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const dy = [0, 1, 0, -1];
  const dx = [1, 0, -1, 0];
  const q = [];
  
  q.push([0,0,1]);
    
  while(q.length){
      const [y,x,cnt] = q.shift();
      
      if(y===n-1 && x===m-1) return cnt;
      
      for(let i=0; i<4; i++){
          const ny=y+dy[i];
          const nx=x+dx[i];
          if(inRange(ny,nx)){
              maps[ny][nx]=0;
              q.push([ny,nx,cnt+1]);
          }
      }
  }

  function inRange(y, x) {
    return 0 <= y && y < n && 0 <= x && x < m && maps[y][x] === 1;
  }
    
  return -1
}