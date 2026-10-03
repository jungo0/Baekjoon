function solution(scores) {
    const wanhoA = scores[0][0];
    const wanhoB = scores[0][1];
    const wanhoSum = wanhoA + wanhoB;

    // [a, b, isWanho] 형태로 완호 여부 플래그 포함
    const mapped = scores.map((s, idx) => [...s, idx === 0]);

    mapped.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);

    let answer = 1;
    let maxScore = 0;

    for (const [a, b, isWanho] of mapped) {
        if (b < maxScore) {
            if (isWanho) return -1;
        } else {
            maxScore = Math.max(maxScore, b);
            if (a + b > wanhoSum) {
                answer++;
            }
        }
    }

    return answer;
}