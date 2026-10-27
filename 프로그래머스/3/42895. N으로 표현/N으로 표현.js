function solution(N, number) {
    // N과 number가 같으면 N을 1번만 사용하여 만들 수 있음
    if (N === number) return 1;

    // dp[i] : N을 i번 사용하여 만들 수 있는 모든 수의 집합 (중복 제거를 위해 Set 사용)
    // i는 1부터 8까지이므로 크기 9의 배열 생성
    const dp = Array.from({ length: 9 }, () => new Set());

    for (let i = 1; i <= 8; i++) {
        // 1. N을 i번 연속해서 이어 붙인 숫자 추가 (예: 5, 55, 555...)
        const repeatedNum = Number(String(N).repeat(i));
        dp[i].add(repeatedNum);

        // 2. 이전에 구한 dp 세트들을 조합하여 사칙연산 수행
        // i = j + (i - j) 구조로 조합
        for (let j = 1; j < i; j++) {
            for (const a of dp[j]) {
                for (const b of dp[i - j]) {
                    dp[i].add(a + b);
                    dp[i].add(a - b);
                    dp[i].add(a * b);
                    if (b !== 0) {
                        dp[i].add(Math.floor(a / b)); // 나누기 연산 시 나머지는 버림
                    }
                }
            }
        }

        // 3. 현재 단계(i)의 집합에 목표 숫자(number)가 포함되어 있다면 즉시 i 반환
        if (dp[i].has(number)) {
            return i;
        }
    }

    // 8번 이하로 만들 수 없는 경우
    return -1;
}