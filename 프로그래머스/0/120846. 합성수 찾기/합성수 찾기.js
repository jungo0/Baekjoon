function solution(n) {
    let answer = 0;
    for(let i = n; i>=1; i--){
        
        let count = false;
        for(let num = 2; num < i-1; num++){
        if(i%num === 0){
            count = true;
        }
    }
    if(count){
        answer += 1;
    }
    }
    return answer;
}

// 약수 구하기 
// 1, n 사이에 나눠지는게 하나 더있으면 합성수