function solution(n, times) {
    let start = 1;
    let end = Math.max(...times) * n;
    let answer = end;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        
        const sum = times.reduce((acc, cur) => acc + Math.floor(mid / cur), 0);

        if (sum < n) {
            start = mid + 1;
        } else {
            answer = mid; 
            end = mid - 1;
        }
    }

    return answer;
}