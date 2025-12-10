function solution(n, arr) {
    var answer = 0;
    
    if(arr.reduce((acc, curr) => acc + curr, 0) <= n) return 0;
    
    arr = arr.sort((a, b) => a - b);
    while (n > 0){
        let max = arr[arr.length - 1];
        for(let i = arr.length - 1; i >=0 ;i--){ // (1)
            if(max <= arr[i]){
                arr[i]--;
                n --;
            }
            if(n === 0) break;
        }
    }
    
    answer = arr.reduce((pre, curr) => {
        pre += curr * curr;
        return pre;
    },0);
    
    return answer;
}
