function solution(land, P, Q) {
  const getCost = (floor) => {
    let ret = 0;
    for (let i = 0; i < land.length; i++) {
      for (let j = 0; j < land[0].length; j++) {
        ret += (land[i][j] - floor) * (land[i][j] > floor ? Q : -P);
      }
    }
    return ret;
  };

  let left = 0;
  let right = Math.max(...land.map((v) => Math.max(...v)));

  while (1) {
    const mid = ~~((left + right) / 2);

    const midCnt = getCost(mid);
    const midLeftCnt = getCost(mid - 1);
    const midRightCnt = getCost(mid + 1);

    if (midLeftCnt >= midCnt && midRightCnt >= midCnt) return midCnt;

    if (midLeftCnt < midRightCnt) right = mid - 1;
    else left = mid + 1;
  }
}