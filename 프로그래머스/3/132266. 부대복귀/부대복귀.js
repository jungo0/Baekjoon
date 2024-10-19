function solution(n, roads, sources, destination) {
    let answer = []
    
    const roadArr = Array.from({length : n + 1}, () => []);
    
    roads.forEach(([a,b]) => {
        roadArr[a].push(b)
        roadArr[b].push(a)
    })

    let queue = [destination]
    const count = Array.from({length: n+1}, () => -1)
    count[destination] = 0
    
    while(queue.length) {
        let cur = queue.shift()
        
        for(const next of roadArr[cur]) {
            if(count[next] === -1){
                queue.push(next)
                count[next] = count[cur]+1
            }
        }
    }

    sources.forEach((s) => {
        answer.push(count[s])
    })

    return answer
}
