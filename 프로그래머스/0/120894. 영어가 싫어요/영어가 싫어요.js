function solution(numbers) {
    const numWords = [
        "zero", "one", "two", "three", "four",
        "five", "six", "seven", "eight", "nine"
    ];

    for (let i = 0; i < numWords.length; i++) {
        numbers = numbers.replaceAll(numWords[i], i);
    }

    return Number(numbers);
}