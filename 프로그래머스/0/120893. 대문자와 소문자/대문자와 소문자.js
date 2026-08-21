function solution(my_string) {
    let answer = '';

    for (let i = 0; i < my_string.length; i++) {
        const char = my_string[i];
        if (char === char.toUpperCase()) {
            answer += char.toLowerCase();
        } 
        else {
            answer += char.toUpperCase();
        }
    }

    return answer;
}