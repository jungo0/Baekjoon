function solution(s) {
    let answer = [];

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (s.indexOf(char) === s.lastIndexOf(char)) {
            answer.push(char);
        }
    }

    answer.sort();

    return answer.join('');
}