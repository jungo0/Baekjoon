function solution(n, build_frame) {
    var currentFrame = [];
    for (let i=0; i<build_frame.length; i++){
        if (build_frame[i][2] == 0 && build_frame[i][3] == 0){
            // 기둥 삭제
            destroyColumn(currentFrame, build_frame[i][0], build_frame[i][1]);
        }else if (build_frame[i][2] == 0 && build_frame[i][3] == 1){
            // 기둥 설치
            buildColumn(currentFrame, build_frame[i][0], build_frame[i][1]);
        } else if (build_frame[i][2] == 1 && build_frame[i][3] == 0){
            // 보 삭제
            destoryFloor(currentFrame, build_frame[i][0], build_frame[i][1]);
        } else if (build_frame[i][2] == 1 && build_frame[i][3] == 1){
            // 보 설치
            buildFloor(currentFrame, build_frame[i][0], build_frame[i][1]);
        }
    }
    currentFrame.sort((a,b)=>{
        if (a[0]>b[0]){
            return 1;
        }else if (a[0]<b[0]){
            return -1;
        }else {
            if (a[1]>b[1]){
                return 1;
            }else if (a[1]<b[1]){
                return -1;
            }else{
                if (a[2]>b[2]){
                    return 1;
                }else if (a[2]<b[2]){
                    return -1;
                }
            }
        }
    })
    console.log(currentFrame);
    return currentFrame;
}
function checkColumn(currentFrame, x, y){
    let result = false;
    // 바닥이면 항상 기둥 설치 가능
    if (y ===0){
        result = true;
    // 밑에 기둥이 있으면 설치 가능
    }else if (currentFrame.find(ele => (ele[0]===x && ele[1]===(y-1) && ele[2] ===0)) !== undefined){
        result = true;
    // 왼쪽에 보가 있으면 설치 가능
    }else if (currentFrame.find(ele => (ele[0]===x-1 && ele[1]===y && ele[2] ===1)) !== undefined){
        result = true;
    // 그 위치에 보가 있으면 설치 가능
    }else if(currentFrame.find(ele => (ele[0]===x && ele[1]===y && ele[2] ===1)) !== undefined){
        result = true;
    }
    return result;
}
function buildColumn(currentFrame, x, y){
    if (checkColumn(currentFrame, x, y)){
        currentFrame.push([x,y,0]);
        console.log(`${x}, ${y} 기둥 설치`);
    }else{
        console.log(`${x}, ${y} 기둥 설치 실패`);   
    }
    return currentFrame;
}
function checkFloor(currentFrame, x, y){
    let result = false;
     // 밑에 기둥이 있으면 설치 가능
    if (currentFrame.find(ele => (ele[0]===x && ele[1]===(y-1) && ele[2] ===0)) !== undefined){
        result = true;
    // 오른쪽 밑에 기둥이 있을때 설치 가능
    }else if(currentFrame.find(ele => (ele[0]===(x+1) && ele[1]===(y-1) && ele[2] ===0)) !== undefined){
        result = true;
    // 왼쪽과 오른쪽에 보가 위치할 때 설치 가능
    }else if ((currentFrame.find(ele => (ele[0]===x-1 && ele[1]===y && ele[2] ===1)) !== undefined)
    &&(currentFrame.find(ele => (ele[0]===(x+1) && ele[1]===y && ele[2] ===1)) !== undefined)){
        result = true;
    }
    return result;
}
function buildFloor(currentFrame, x, y){
    if (checkFloor(currentFrame, x, y)){
        currentFrame.push([x,y,1]);
        console.log(`${x}, ${y} 보 설치`);
    }else{
        console.log(`${x}, ${y} 보 설치 실패`);   
    }
    return currentFrame;
}
function destroyColumn(currentFrame, x, y){
    // 현재 위치의 기둥 임시 삭제
    let tempFrame = Object.assign([], currentFrame);
    let findItem = tempFrame.find(ele => (ele[0]===x && ele[1]===y && ele[2] ===0));
    let idx = tempFrame.indexOf(findItem);
    tempFrame.splice(idx,1);
    // 모든 기둥과 보의 조건을 체크
    let result = true;
    for (let i=0; i<tempFrame.length; i++){
        if (tempFrame[i][2]==0){
            if(!checkColumn(tempFrame, tempFrame[i][0], tempFrame[i][1]))
                result = false;                              
        }else {
            if(!checkFloor(tempFrame,tempFrame[i][0], tempFrame[i][1]))
                result = false;
        }
    }
    if (result){
        console.log(`${x}, ${y} 기둥 삭제`);    
        currentFrame.splice(idx,1);
    }else{
        console.log(`${x}, ${y} 기둥 삭제 실패`);
    }
    
}
function destoryFloor(currentFrame, x, y){
    // 현재 위치의 기둥 임시 삭제
    let tempFrame = Object.assign([], currentFrame);
    let findItem = tempFrame.find(ele => (ele[0]===x && ele[1]===y && ele[2] ===1));
    let idx = tempFrame.indexOf(findItem);
    tempFrame.splice(idx,1);
    // 모든 기둥과 보의 조건을 체크
    let result = true;
    for (let i=0; i<tempFrame.length; i++){
        if (tempFrame[i][2]===0){
            if(!checkColumn(tempFrame, tempFrame[i][0], tempFrame[i][1]))
                result = false;                              
        }else {
            if(!checkFloor(tempFrame,tempFrame[i][0], tempFrame[i][1]))
                result = false;
        }
    }
    if (result){
        console.log(`${x}, ${y} 보 삭제`);    
        currentFrame.splice(idx,1);
    }else{
        console.log(`${x}, ${y} 보 삭제 실패`);
    }
}