function solution (n, money){
    const MOD = 1000000007;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    
    for(let elem of money){
    	for(let i = elem; i < n+1; i++){
        	dp[i] = (dp[i] + dp[i - elem]) % MOD;
        }
    }
    
    return dp[n];
}