function solution(order) {
    let answer = 0;
    const stringOrder = String(order);

    for (let i = 0; i < stringOrder.length; i++) {
        const item = stringOrder[i];
        if (item === '3' || item === '6' || item === '9') {
            answer += 1; // 또는 answer++;
        }
    }

    return answer;
}