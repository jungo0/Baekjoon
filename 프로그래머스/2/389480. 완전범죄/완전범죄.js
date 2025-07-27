function solution(info, n, m) {
    const dp = new Map(); 
    let minA = Infinity;
    
    function dfs(index, traceA, traceB) {
        if (traceA >= n || traceB >= m) return Infinity;
        if (index === info.length) return traceA;
        
        const key = `${index},${traceA},${traceB}`;
        if (dp.has(key)) return dp.get(key);
        
        const pickA = dfs(index + 1, traceA + info[index][0], traceB);
        const pickB = dfs(index + 1, traceA, traceB + info[index][1]);
        const result = Math.min(pickA, pickB);
      
        dp.set(key, result);
        return result;
    }
    
    const answer = dfs(0, 0, 0);
    return answer === Infinity ? -1 : answer;
}