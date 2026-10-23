function solution(N, number) {
    if (N === number) return 1;

    const dp = Array.from({ length: 9 }, () => new Set());

    for (let i = 1; i <= 8; i++) {
        const repeatedNum = Number(String(N).repeat(i));
        dp[i].add(repeatedNum);

        for (let j = 1; j < i; j++) {
            for (const a of dp[j]) {
                for (const b of dp[i - j]) {
                    dp[i].add(a + b);
                    dp[i].add(a - b);
                    dp[i].add(a * b);
                    if (b !== 0) {
                        dp[i].add(Math.floor(a / b)); // 나누기 연산 시 소수점 버림
                    }
                }
            }
        }

        // 3. 목표 숫자(number)를 만들었는지 확인
        if (dp[i].has(number)) {
            return i;
        }
    }

    // 최솟값이 8보다 큰 경우
    return -1;
}