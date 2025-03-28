const combination = (arr,n,step,sum) =>{
    
    if(step===10) return [[...arr , n-sum]]
    
    let ret = []
    for (let i = 0 ; i<=n-sum ; i++) {
        if (sum+i > n) break
        const attached = combination([...arr,i],n,step+1,sum+i)
        ret.push(...attached)
    }
    return ret
}

const getScore = (lion,apeach) => {
    let lionScore = 0
    let apeachScore = 0
    for (let i = 0 ; i< 11 ; i ++) {
        if (!lion[i] && !apeach[i]) continue
        if (lion[i] > apeach[i]) lionScore += 10-i
        else apeachScore += 10-i
    }
    
    if (apeachScore >= lionScore) return false
    else return lionScore-apeachScore
}

const getLastNonZeroIdx = (arr) => {
    for (let i = arr.length-1 ; i >= 0 ; i --){
        if (arr[i] !== 0) return i
    }
    return undefined
}

function solution(n, info) {
    
    let ret = []
    let diff = 0
    for (const ary of combination([],n,0,0)){
        const scoreDiff = getScore(ary,info)
        if (!scoreDiff) continue
        if (scoreDiff > diff) {
            ret = ary
            diff = scoreDiff
        } else if(scoreDiff === diff) {
            const aryIdx = getLastNonZeroIdx(ary)
            const retIdx = getLastNonZeroIdx(ret)
            if (retIdx < aryIdx) ret = ary
            else if (retIdx===aryIdx && ret[aryIdx] < ary[aryIdx]) ret= ary
            
        }
    }
    
    return ret.length ? ret : [-1]
}