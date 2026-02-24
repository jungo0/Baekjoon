const candidateSet = [];
const combSet = new Set();
function solution(relation) {
    let answer = 0;
    
    for(let i = 1; i<1<<relation[0].length; i++){
        if(!checkCandidate(i, relation)) continue;
        if(checkSubSet(i)) continue; 
        candidateSet.push(i);
    }
    answer = candidateSet.length;
    return answer;
}

const checkCandidate = (key, relation) => {
    const checkSet = new Set();
    for(let i = 0; i<relation.length; i++){
        let keyStr = "";
        for(let j=0; j<relation[0].length; j++){
            if(key&1<<j) keyStr+=relation[i][j]; 
        }
        if(checkSet.has(keyStr)) {
            return false;
        }
        checkSet.add(keyStr);
    }
    return true;
}

const checkSubSet = (key) => {
    for(let candidate of candidateSet){
        if((key&candidate)===candidate) return true; 
    }
    return false;
}