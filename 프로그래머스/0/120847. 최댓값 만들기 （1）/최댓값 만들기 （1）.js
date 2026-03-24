function solution(numbers) {
    numbers = numbers.sort((a, b) => a - b);
    return numbers.at(-1) * numbers.at(-2);
}