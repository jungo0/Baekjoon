class Heap {
    constructor() {
        this.heap = [];
    }
    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);
    
    peek = () => this.heap[0]; 
    insert = (key, value) => { 
        const node = { key, value }; 
        this.heap.push(node);
        this.heapifyUp();
    }
    heapifyUp = () => {
        let index = this.heap.length - 1;
        const lastInsertedNode = this.heap[index];

        while (index > 0) {
            const parentIndex = this.getParentIndex(index);

            if (this.heap[parentIndex].value > lastInsertedNode.value) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            } else {
                break;
            }
        }
        this.heap[index] = lastInsertedNode;
    }
    remove = () => {
        const count = this.heap.length;
        const rootNode = this.heap[0];

        if (count <= 0) {
            return undefined;
        }
        if (count === 1) {
            this.heap = [];
        }
        else {
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        return rootNode
    }
    heapifyDown = () => {
        let index = 0;
        const count = this.heap.length;
        const rootNode = this.heap[index];

        while (this.getLeftChildIndex(index) < count) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);

            const smallerChildIndex = rightChildIndex < count && this.heap[rightChildIndex].value < this.heap[leftChildIndex].value ? rightChildIndex : leftChildIndex;

            if (this.heap[smallerChildIndex].value <= rootNode.value) {
                this.heap[index] = this.heap[smallerChildIndex];
                index = smallerChildIndex;
            } else {
                break;
            }
        }
        this.heap[index] = rootNode;
    }
}
class PriorityQueue extends Heap {
    constructor() {
        super();
    }

    enqueue = (priority, value) => this.insert(priority, value);
    dequeue = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}
let ans = 0;
function solution(n, paths, gates, summits) {
    let answer = [];
    let priority = [];
    let link = [];
    const pq = new PriorityQueue();
    for(let i=0; i<=n; ++i){
        let temp = [];
        link.push(temp);
        priority[i] = 987654321;
    }
    for(let i=0; i<paths.length; ++i){
        link[paths[i][0]].push([paths[i][1], paths[i][2]]);
        link[paths[i][1]].push([paths[i][0], paths[i][2]]);
    }
    for(let i=0; i<gates.length; ++i){
        priority[gates[i]] = 0;
        for(let j=0; j<link[gates[i]].length; ++j){
            pq.enqueue([gates[i], link[gates[i]][j][0]], link[gates[i]][j][1]);
            link[gates[i]][j][0] = 0;
        }
    }
    while(!pq.isEmpty()){
        let temp = pq.dequeue();
        let prev = temp.key[0];
        let cur = temp.key[1];
        let value = temp.value;
        let chk;
        if(priority[cur] < Math.max(priority[prev], value)){
            continue;
        }
        priority[cur] = Math.max(priority[prev], value);
        
        chk = false;
        for(let i=0; i<summits.length; ++i){
            if(prev === summits[i]){
                chk = true;
                break;;
            }
        }
        if(chk){
            continue;
        }
        for(let i=0; i<link[cur].length; ++i){
            if(link[cur][i][0] == 0){
                continue;
            }
            pq.enqueue([cur, link[cur][i][0]], link[cur][i][1]);
            link[cur][i][0] = 0;
        }
    }
    answer[0] = 987654321;
    answer[1] = 987654321;
    for(let i=0; i<summits.length; ++i){
        if(answer[1] > priority[summits[i]]){
            answer[1] = priority[summits[i]];
            answer[0] = summits[i];
        } else if(answer[1] === priority[summits[i]]){
            answer[0] = Math.min(answer[0], summits[i]);
        }
    }
    return answer;
}