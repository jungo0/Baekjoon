function solution(money) {
    const {length} = money
    let ret = 0
    let still = -99999
    let noneStill = money[0]
    
    for (let i = 2; i < length-1 ; i++) {
        const nxStill = noneStill + money[i]
        const nxNoneStill = Math.max(still,noneStill)
        still = nxStill
        noneStill = nxNoneStill
    }
    ret = Math.max(still,noneStill)
    still = 0
    noneStill = 0
    for (let i = 1; i < length ; i++) {
        const nxStill = noneStill + money[i]
        const nxNoneStill = Math.max(still,noneStill)
        still = nxStill
        noneStill = nxNoneStill
    }
    
    return Math.max(still,noneStill,ret)
}