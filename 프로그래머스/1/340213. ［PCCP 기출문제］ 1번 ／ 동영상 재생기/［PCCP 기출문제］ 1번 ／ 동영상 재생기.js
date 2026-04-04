function timeToSeconds(time) {
    const [minute, second] = time.split(":").map(Number);
    return minute * 60 + second;
}

function solution(video_len, pos, op_start, op_end, commands) {
    let current = timeToSeconds(pos);
    const videoEnd = timeToSeconds(video_len);
    const openingStart = timeToSeconds(op_start);
    const openingEnd = timeToSeconds(op_end);

    commands.forEach(cmd => {
        if (openingStart <= current && current <= openingEnd) current = openingEnd;
        if (cmd === "prev") current = Math.max(0, current - 10);
        if (cmd === "next") current = Math.min(videoEnd, current + 10);
    });

    if (openingStart <= current && current <= openingEnd) current = openingEnd;
    return `${String(Math.floor(current / 60)).padStart(2, '0')}:${String(current % 60).padStart(2, '0')}`
}
