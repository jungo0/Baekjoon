function solution(array) {
    const counts = new Map();

    array.forEach(num => {
        counts.set(num, (counts.get(num) || 0) + 1);
    });

    const sorted = [...counts].sort((a, b) => b[1] - a[1]);
    if (sorted.length > 1 && sorted[0][1] === sorted[1][1]) {
        return -1;
    }
    return sorted[0][0];
}