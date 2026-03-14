function solution(target) {
    const MAX = Number.MAX_SAFE_INTEGER;
    const dp = Array.from({ length: 100_002 }, () => [MAX, 0]);
    let cnt = 50;
    let n = 1;
    while (cnt <= 100_002) {
        dp[cnt] = [n, n++];
        cnt += 50;
    }

    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 21; j++) {
            const value = i * j;
            if (dp[value][0] === MAX) {
                const cnt = i === 1 ? 1 : 0;
                dp[value] = [1, cnt];
            }
        }
        }

    for (let cur = 23; cur <= target; cur++) {
        for (let mul = 1; mul < 4; mul++) {
            for (let score = 1; score < 21; score++) {
                const totalScore = mul * score;
                if (totalScore > cur) break;
                const restScore = cur - totalScore;
                if (dp[totalScore][0] + dp[restScore][0] > dp[cur][0]) continue;
                else if (dp[cur][0] === dp[totalScore][0] + dp[restScore][0])
                    dp[cur][1] = Math.max(
                        dp[cur][1],
                        dp[totalScore][1] + dp[restScore][1]
                    );
                else
                    dp[cur] = [
                        dp[totalScore][0] + dp[restScore][0],
                        dp[totalScore][1] + dp[restScore][1],
                    ];
            }
        }
    }

    return dp[target];
}
