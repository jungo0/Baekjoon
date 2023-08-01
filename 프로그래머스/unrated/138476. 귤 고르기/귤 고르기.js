function solution(k, tangerine) {
    const freq = new Map();
    tangerine.forEach(t => freq.set(t, (freq.get(t) || 0) + 1));
    
    const counts = Array.from(freq.values()).sort((a, b) => b - a);
    
    let result = 0;
    
    while(k > 0) {
        k -= counts.shift();
        result++;
    }
    
    return result;
}