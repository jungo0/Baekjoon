function solution(sticker) {
    const N = sticker.length;

    if (N === 1) return sticker[0];

    // 1. 첫 번째 스티커를 떼는 경우: index 0부터 N-2까지 탐색
    const max1 = getMaxSticker(sticker.slice(0, N - 1));

    // 2. 첫 번째 스티커를 떼지 않는 경우: index 1부터 N-1까지 탐색
    const max2 = getMaxSticker(sticker.slice(1, N));

    return Math.max(max1, max2);
}

// 직선 형태의 스티커 배열에서 최대합을 구하는 헬퍼 함수
function getMaxSticker(arr) {
    const len = arr.length;
    if (len === 1) return arr[0];

    const dp = Array(len).fill(0);
    dp[0] = arr[0];
    dp[1] = Math.max(arr[0], arr[1]);

    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i]);
    }

    return dp[len - 1];
}