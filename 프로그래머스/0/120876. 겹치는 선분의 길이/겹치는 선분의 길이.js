function solution(lines) {
    const segmentCount = {};

    for (let i = 0; i < lines.length; i++) {
        const start = lines[i][0];
        const end = lines[i][1];

        for (let j = start; j < end; j++) {
            if (segmentCount[j]) {
                segmentCount[j] += 1;
            } else {
                segmentCount[j] = 1;
            }
        }
    }

    let overlapLength = 0;

    for (const key in segmentCount) {
        if (segmentCount[key] >= 2) {
            overlapLength += 1;
        }
    }

    return overlapLength;
}