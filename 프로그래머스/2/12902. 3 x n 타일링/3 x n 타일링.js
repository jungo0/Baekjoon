function solution(n) {
    let mod = 1_000_000_007n;
    let arr = [1n, 3n];
    
    for(let i = 1 ; i < n/2; i ++){
        arr = [arr[1], arr[1] * 4n - arr[0]];
    }
    
    return arr[1] % mod;
}