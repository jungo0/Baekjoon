function solution(data, col, row_begin, row_end) {
    let result = 0
    const sortData = data.sort((a,b) => {
        if(a[col-1] > b[col-1]) return 1
        else if(a[col-1] === b[col-1]) return b[0] - a[0]
        else return -1
    })
    for(let i = row_begin ; i <= row_end ; i ++) {
        result ^= sortData[i-1].map(a => a%i).reduce((acc, cur, idx) => acc+cur, 0)
    }
    return result
}