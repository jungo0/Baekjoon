function solution(n) {
    let answer = 0;
    const arr = new Array(n+1).fill(true); // 초깃값 설정
    const end = Math.sqrt(n) 
    
    for(let i = 2; i <= end; ++i){
        // 이미 소수가 아닌 인덱스는 스킵
        if(arr[i] === false){
            continue; 
        }
        // 소수가 아닌 데이터는 false
        for(let k = i * i; k <= n; k += i){
            arr[k] = false;
        }
    }
    // 소수의 갯수
    for(let i = 2; i <= n; ++i){
        if(arr[i] === true){
            answer++;
        }
    }
    return answer;
}