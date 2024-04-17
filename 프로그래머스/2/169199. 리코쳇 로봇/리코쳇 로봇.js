function solution(board) {
    var answer = 0;
    //가로길이
    var xLen = board[0].length;
    //세로길이
    var yLen = board.length;
      

    var startCor
    board = board.map((element)=>element.split(""));
    board.forEach((element,index)=>{
       for(var i =0;i<element.length;i++){
        if(element[i]==="R"){
            // x,y 순서 [1,3]
            startCor= [i,index];
            break;
        }
       } 
    });

    var queue = [startCor];
    board[startCor[1]][startCor[0]] = "C";

    var moveX = [1,-1,0,0];
    var moveY = [0,0,1,-1];

    while(queue.length!==0){

        const size = queue.length;

        for(var i = 0;i<size;i++){
            let[x,y] = queue.shift();
            
            for(var moveI =0;moveI<4;moveI++){
                var dx = x + moveX[moveI];
                var dy = y + moveY[moveI];
                while(dx>=0 && dy>=0 && dx<xLen&& dy<yLen && board[dy][dx]!=="D"){
                    dx += moveX[moveI];
                    dy += moveY[moveI];
                }

                dx -= moveX[moveI];
                dy -= moveY[moveI];

                if(board[dy][dx] === "G"){
                    return answer+1;
                }
                else if(board[dy][dx] !== "C"){
                    board[dy][dx] = "C";
                    queue.push([dx,dy]);
                }
            }
        }
        answer++;

    }    
    return -1;
}