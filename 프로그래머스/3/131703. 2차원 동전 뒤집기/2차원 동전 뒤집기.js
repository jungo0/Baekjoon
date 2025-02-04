function solution(beginning, target) {
    const N = beginning.length;
    const M = beginning[0].length;

    let ans = Infinity;

    for (let k = 0; k < 4; k++) {
        let copy = JSON.parse(JSON.stringify(beginning));
        let cnt = 0;

        for (let i = 0; i < N; i++) {
            if ((k < 2 && copy[i][0] != target[i][0]) || (k >= 2 && copy[i][0] == target[i][0])) {
                cnt++;
                for (let j = 0; j < M; j++) {
                    copy[i][j] = 1 ^ copy[i][j];
                }
            }
        }

        for (let j = 0; j < M; j++) {
            if ((k % 2 == 0 && copy[0][j] != target[0][j]) || (k % 2 == 1 && copy[0][j] == target[0][j])) {
                cnt++;
                for (let i = 0; i < N; i++) {
                    copy[i][j] = 1 ^ copy[i][j];
                }
            }
        }

        if (JSON.stringify(copy) == JSON.stringify(target)) {
            ans = Math.min(ans, cnt);
        }
    }

    return ans == Infinity ? -1 : ans;
}
