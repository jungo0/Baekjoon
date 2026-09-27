function solution(operations) {
    const queue = [];

    for (const op of operations) {
        const [command, value] = op.split(" ");
        const num = Number(value);

        if (command === "I") {
            queue.push(num);
        } else if (command === "D" && queue.length > 0) {
            if (num === 1) {
                // 최댓값 제거
                const maxIndex = queue.indexOf(Math.max(...queue));
                queue.splice(maxIndex, 1);
            } else {
                // 최솟값 제거
                const minIndex = queue.indexOf(Math.min(...queue));
                queue.splice(minIndex, 1);
            }
        }
    }

    if (queue.length === 0) return [0, 0];
    
    return [Math.max(...queue), Math.min(...queue)];
}