function solution(scores) {
    const [wanhoA, wanhoB] = scores[0];
    const wanhoSum = wanhoA + wanhoB;

    scores.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);

    let answer = 1;
    let maxScore = 0;

    for (const [a, b] of scores) {
        if (b < maxScore) {
            if (a === wanhoA && b === wanhoB) return -1;
        } else {
            maxScore = Math.max(maxScore, b);
            
            if (a + b > wanhoSum) {
                answer++;
            }
        }
    }

    return answer;
}