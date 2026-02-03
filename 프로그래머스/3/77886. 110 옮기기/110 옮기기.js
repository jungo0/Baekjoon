function solution(s) {
    const answers = [];

    for (let str of s) {
        let stack = [];
        let count = 0;

        for (let i = 0; i < str.length; i++) {
            stack.push(str[i]);
            if (
                stack.length >= 3 &&
                stack[stack.length - 3] === '1' &&
                stack[stack.length - 2] === '1' &&
                stack[stack.length - 1] === '0'
            ) {
                stack.pop();
                stack.pop();
                stack.pop();
                count++;
            }
        }

        let idx = stack.lastIndexOf('0');
        if (idx === -1) {
            stack = Array(count).fill('110').join('') + stack.join('');
        } else {
            stack =
                stack.slice(0, idx + 1).join('') +
                Array(count).fill('110').join('') +
                stack.slice(idx + 1).join('');
        }

        answers.push(stack);
    }

    return answers;
}

const a = ['1110', '100111100', '0111111010'];
console.log(solution(a));