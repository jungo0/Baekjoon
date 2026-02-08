function solution(m, n, puddles) {
    let arr = Array.from(Array(n+1), () => Array(m+1).fill(0))  //메모이제이션 배열
    if(puddles.length > 0) puddles.forEach(([col, row]) => arr[row][col] = -1)  //물 잠긴 지역 표시

    const getRoute = (row, col) => {
        if(row > n || col > m || arr[row][col] === -1) return 0  //벗어날 경우 or 물 잠긴 지역
        if(row === n && col === m) return 1  //도착
        if(arr[row][col] !== 0) return arr[row][col]  //메모값 있을 때
        else return arr[row][col] = (getRoute(row+1, col) + getRoute(row, col+1)) % 1000000007
    }
    
    return getRoute(1,1);
}
