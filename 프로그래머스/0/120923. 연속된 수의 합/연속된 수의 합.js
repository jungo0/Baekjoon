function solution(num, total) {
    const sumStep = (num * (num - 1)) / 2;
    
    const start = (total - sumStep) / num;
    
    return Array.from({ length: num }, (_, i) => start + i);
}