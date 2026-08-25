function solution(num, k) {
    const strNum = String(num);
    const strK = String(k);

    for (let i = 0; i < strNum.length; i++) {
        if (strNum[i] === strK) {
            return i + 1;
        }
    }

    return -1;
}