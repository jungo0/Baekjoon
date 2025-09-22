function solution(board) {
    var answer = 0;
    
    // [idx, x1, y1, x2, y2];
    const block = [];
    const map = new Map();
    
    for(let i=0;i<board.length;i++) {
        for(let j=0;j<board.length;j++) {
            if(board[i][j] > 0 && !map.has(board[i][j])) {
                let x1, y1, x2, y2;
                let idx = board[i][j];
                x1 = i;
                x2 = i;
                y1 = Infinity;
                y2 = -Infinity;
                for(let k=i;k<board.length;k++) {
                    if(!board[k].includes(idx)) {
                        break;
                    }
                    x2 = k;
                    y1 = Math.min(y1, board[k].indexOf(idx));
                    y2 = Math.max(y2, board[k].lastIndexOf(idx));
                }
                map.set(idx, block.length);
                block.push([idx, x1, y1, x2, y2]);  
            }
        }
    }

    const dropBlock = () => {
        for(let i=0;i<board.length;i++) {
            for(let j=0;j<board.length;j++) {
                if(board[j][i] > 0) {
                    break;
                }
                board[j][i] = -1;
            }
        }
    }
    
    const removeBlock = () => {
        let isChange = false;
        if(map.size === 0) {
            return;
        }
        
        dropBlock();
        
        map.forEach((value, key) => {
            const [idx, x1, y1, x2, y2] = block[value];
            let rm = true;
            for(let i=x1;i<=x2;i++) {
                for(let j=y1;j<=y2;j++) {
                    if(board[i][j] !== idx && board[i][j] >= 0) {
                        rm = false;
                        break;
                    }
                }
            }
            // 지울 수 있는 블록
            if(rm) {
                isChange = true;
                for(let i=x1;i<=x2;i++) {
                    for(let j=y1;j<=y2;j++) {
                        board[i][j] = 0;
                    }
                }
                map.delete(idx);
                answer++;
            }
        })
        
        if(isChange) {
            removeBlock();
        }
    }
    
    removeBlock();
    
    return answer;
}