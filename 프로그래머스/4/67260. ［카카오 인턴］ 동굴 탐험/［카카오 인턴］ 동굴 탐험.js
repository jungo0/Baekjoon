
class Queue {
    constructor() {
        this._arr = [];
    }
    
    push(value) {
        this._arr.push(value);
    }
    
    pop() {
        return this._arr.shift();
    }

    isEmpty() {
        return this._arr.length === 0;
    }
}

var Edge;
var beforePath;
var visit;
function solution(n, path, order) {
    Edge = Array.from({length: n},() => []);
    beforePath = Array(n);
    visit = Array(n).fill(false);
    
    for(let o of order) {
        beforePath[o[1]] = o[0];
    }

    if(beforePath[0] !== undefined) {
        return false;
    }
    
    for(let p of path) {
        Edge[p[0]].push(p[1]);
        Edge[p[1]].push(p[0]);
    }
    const q = new Queue();
    const un_entered = new Array(n).fill(-1);
    visit[0] =true;
    q.push(0);
    var answer = false;
    var cnt = 1;

    while(!q.isEmpty()) {
        let cur = q.pop();

        for(let next of Edge[cur]) {
            if (beforePath[next] !== undefined && !visit[beforePath[next]]) {
                un_entered[beforePath[next]] = next;
                continue;
            }

            if(visit[next])
                continue;

            if(un_entered[next] != -1) {
                cnt++;
                visit[un_entered[next]] = true;
                q.push(un_entered[next]);
            }
            
            visit[next] = true;
            cnt++;
            q.push(next);
        }
    }

    if(cnt === n )
        answer = true;

    return answer;
}