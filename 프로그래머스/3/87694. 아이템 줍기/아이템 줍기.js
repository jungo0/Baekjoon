function solution(rectangle, characterX, characterY, itemX, itemY) {
    const size = 102
    const board = Array.from({length:size}, ()=>Array(size).fill(0));
    
    for(let i = 0 ; i < rectangle.length; i++) {
        const [lx, ly, rx, ry] = rectangle[i];
        for(let x = lx*2; x <= rx*2; x++) {
            for(let y = ly*2; y <= ry*2; y++) {
                board[x][y] = 1;
            }
        }
    }
    const dx = [-1, 0, 1, 0, -1, -1, 1, 1];
    const dy = [0, 1, 0, -1, 1, -1, -1, 1];

    const innerRemove = () => {
        const temp = Array.from({length:size}, ()=>Array(size).fill(false));
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                let count = 0;
                if(board[i][j] === 1) {
                    for(let k = 0; k < 8; k++) {
                        const nx = i + dx[k];
                        const ny = j + dy[k];
                        if(board[nx][ny] === 1) count++;
                    }
                    if(count > 7) temp[i][j] = true;
                }
            }
        }
        
        for(let i = 0 ; i < size; i++) {
            for(let j = 0 ; j < size; j++) {
                if(temp[i][j]) board[i][j] = 0;
            }
        }
    }
    
    innerRemove();
    
    const visited = Array.from({length:size}, ()=>Array(size).fill(0));
    const bfs = (sx, sy) => {
        visited[sx][sy] = 1;
        
        const queue = [];
        queue.push([sx, sy]);
        
        while(queue.length) {
            const [x, y] = queue.shift();
            
            for(let i = 0 ; i < 4; i++) {
                const nx = dx[i] + x;
                const ny = dy[i] + y;
                
                if(nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
                if(visited[nx][ny] > 0) continue;
                if(board[nx][ny] === 1) {
                    visited[nx][ny] = visited[x][y] + 1;
                    queue.push([nx, ny]);
                }
            }
        }
    }
    bfs(characterX*2,characterY*2)
    
    
    return ~~(visited[itemX*2][itemY*2] / 2)
    
}