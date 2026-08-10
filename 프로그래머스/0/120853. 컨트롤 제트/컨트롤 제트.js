function solution(s) {
    const stack = [];
    const arr = s.split(' ');

    for (const item of arr) {
        if (item === 'Z') {
            // 'Z'가 나오면 가장 최근에 넣었던 숫자를 하나 꺼내서 버림
            stack.pop();
        } else {
            // 숫자가 나오면 스택에 담음 (Number로 형변환)
            stack.push(Number(item));
        }
    }

    // 스택에 남아있는 숫자들을 모두 더함
    return stack.reduce((acc, cur) => acc + cur, 0);
}