function solution(scores) {
    // 완호의 원래 점수 저장
    const wanho = scores[0];
    const wanhoSum = wanho[0] + wanho[1];

    scores.sort((a, b) => {
        if (a[0] !== b[0]) {
            return b[0] - a[0]; // 근무 태도 내림차순
        }
        return a[1] - b[1]; // 동료 평가 오름차순
    });

    let maxPeerScore = 0;
    let wanhoRank = 1;

    for (const score of scores) {
        if (score[1] < maxPeerScore) {
            if (score === wanho) {
                return -1; // 완호가 탈락한 경우
            }
        } else {
            // 인센티브 대상자 유지
            maxPeerScore = Math.max(maxPeerScore, score[1]);
            const currentSum = score[0] + score[1];
            
            // 완호보다 점수 합이 큰 사람의 수를 세어 석차 결정
            if (currentSum > wanhoSum) {
                wanhoRank++;
            }
        }
    }

    return wanhoRank;
}