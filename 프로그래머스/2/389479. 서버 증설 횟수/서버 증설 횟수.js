function solution(players, m, k) {
    if (k === 1) return players.reduce((a, c) => a + Math.trunc(c / m), 0);
    
    const servers = Array(24).fill(0);
    let result = 0;
    
    players.map((p , time) => {
        const need = Math.trunc(p / m); 
       
        if (need > servers[time]) {
            const addServer = need - servers[time];
            
            for (let i = 0; i < k; i++) {
                if (time + i <= 23) {
                    servers[time + i] += addServer;
                }
            }
            
            result += addServer;
        }
    })
    return result;   
}