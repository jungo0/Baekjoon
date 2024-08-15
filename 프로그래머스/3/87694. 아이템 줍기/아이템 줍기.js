function solution(rectangle, characterX, characterY, itemX, itemY) {
    characterX *= 2;
    characterY *= 2;
    itemX *= 2;
    itemY *= 2;
    let dobuleRec = rectangle.map(rec => rec.map(point => point * 2));
    
    const moveX = [1, -1, 0, 0];
    const moveY = [0, 0, 1, -1];
    
    const start = [characterX, characterY, 0];
    let que = [start];
    
    let range = Array.from({ length: 103 }, () => Array(103).fill(0));
    dobuleRec.forEach(([x1, y1, x2, y2]) => {
        for (let i = x1; i <= x2; i++) {
          for (let j = y1; j <= y2; j++) {
            if (i === x1 || i === x2 || j === y1 || j === y2) {
              if (range[i][j] === 0) range[i][j] = 1;
            } else {
              range[i][j] = 2;
            }
          }
        }
    });

    range[characterX][characterY] = 0
    
    while(que.length > 0){
        let [x, y, cnt] = que.shift();
    
        if(x === itemX && y === itemY) return cnt/2;
    
        for(let i=0; i<4; i++){
            let chX = x + moveX[i];
            let chY = y + moveY[i];
            if(range[chX][chY] === 1) {
                que.push([chX, chY, cnt+1]); 
                range[chX][chY] = 0;
            }
        }
    }
    return 0;
}