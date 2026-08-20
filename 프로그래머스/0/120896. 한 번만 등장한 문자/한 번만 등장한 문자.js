function solution(s) {
    const charCount = {};

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (charCount[char]) {
            charCount[char] += 1;
        } else {
            charCount[char] = 1;
        }
    }

    const uniqueChars = [];
    for (const char in charCount) {
        if (charCount[char] === 1) {
            uniqueChars.push(char);
        }
    }

    uniqueChars.sort();
    return uniqueChars.join('');
}