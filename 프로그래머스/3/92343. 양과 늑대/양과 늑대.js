function solution(info, edges) {
    let map = new Map();
    
    edges.forEach(([a, b]) => {
        if (!map.has(a)) map.set(a, []);
        map.get(a).push(b);
    });
    
    let max = Number.MIN_SAFE_INTEGER;

    function dfs(current, nextNodes, sheep, wolf) {
       info[current] === 0 ? sheep++ : wolf++
        if(wolf >= sheep) return; 
        if(max < sheep) max = sheep; 
        
        let possibleNodes =[...nextNodes, ...(map.get(current)) || []]
        possibleNodes.splice(nextNodes.indexOf(current), 1)
        
        for(let next of possibleNodes){
            dfs(next, possibleNodes, sheep, wolf)
        }
    }

    dfs(0, [0], 0, 0);
    return max;
}