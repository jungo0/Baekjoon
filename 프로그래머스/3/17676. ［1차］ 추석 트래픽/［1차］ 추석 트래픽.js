function solution(lines) {
    const times = [];

    // 1. 각 로그를 밀리초(ms) 단위의 [시작시간, 끝시간]으로 변환
    for (const line of lines) {
        const [, timeStr, durationStr] = line.split(" ");

        // 응답 완료 시간(S)을 ms로 변환
        const [h, m, s] = timeStr.split(":");
        const endTime = (Number(h) * 3600 + Number(m) * 60 + Number(s)) * 1000;

        // 처리 시간(T)을 ms로 변환
        const duration = Number(durationStr.replace("s", "")) * 1000;

        // 시작 시간 = 끝 시간 - 처리 시간 + 1ms (경계 포함)
        const startTime = endTime - duration + 1;

        times.push({ start: startTime, end: endTime });
    }

    let maxCount = 0;

    // 2. 각 로그의 시작점과 끝점을 기준으로 1초(=1000ms) 구간의 최대 처리량 계산
    for (let i = 0; i < times.length; i++) {
        // 끝 시간을 기준으로 시작하는 1초 구간 [end, end + 999]
        const secStart1 = times[i].end;
        const secEnd1 = secStart1 + 999;
        let count1 = 0;

        // 시작 시간을 기준으로 시작하는 1초 구간 [start, start + 999]
        const secStart2 = times[i].start;
        const secEnd2 = secStart2 + 999;
        let count2 = 0;

        for (const time of times) {
            // 구간 1과 겹치는지 확인
            if (time.start <= secEnd1 && time.end >= secStart1) {
                count1++;
            }
            // 구간 2와 겹치는지 확인
            if (time.start <= secEnd2 && time.end >= secStart2) {
                count2++;
            }
        }

        maxCount = Math.max(maxCount, count1, count2);
    }

    return maxCount;
}