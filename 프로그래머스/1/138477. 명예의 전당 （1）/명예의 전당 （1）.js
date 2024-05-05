function solution(k, score) {
    let stack = [];
    let ans = [];
    
    for(let i = 0; i < score.length; i++){
        stack.push(score[i]);
        
        if(stack.length >= k){
            stack.sort((a, b) => b - a);
            ans.push(stack[k - 1]);
            continue;
        }
        
        ans.push(Math.min(...stack));
    }
    
    return ans;
}