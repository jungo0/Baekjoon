function solution(rows, columns, queries) {
    const result = []
    const table = Array.from({length: rows + 1}, () => [])
    let tdx = 1
    // 테이블 값 입력
    for (let i = 1; i <= rows; i += 1) {
        for (let j = 1; j <= columns; j += 1) table[i][j] = tdx++
    }
    // 반 시계로 순회
    queries.forEach(query => {
        const [row, col, drow, dcol] = query
        let [nr, nc] = [row, dcol] // 현재 위치 (오른쪽 위부터)
        const cddt = [table[nr][nc]] // 시작 위치 값 저장
        while (nc > col) cddt.push(table[nr][nc] = table[nr][--nc])
        while (nr < drow) cddt.push(table[nr][nc] = table[++nr][nc])
        while (nc < dcol) cddt.push(table[nr][nc] = table[nr][++nc])
        while (nr > row) cddt.push(table[nr][nc] = table[--nr][nc])
        table[nr + 1][nc] = cddt[0] // 시작 위치 값 입력
        result.push(Math.min(...cddt)) // 회전 요소 중 최솟값
    })
    return result
}