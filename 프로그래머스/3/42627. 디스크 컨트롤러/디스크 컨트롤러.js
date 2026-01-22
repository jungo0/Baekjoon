function solution(jobs) {
    var answer = 0;
    let q = [];

    jobs.sort((u, v) => {
        return u[0] - v[0];
    });

    console.log(jobs);

    let len = jobs.length;
    let i = 0;
    let now = 0;
    while (i < len || q.length > 0) {
        if (i < len && jobs[i][0] <= now) {
            q.push(jobs[i++]);
            continue;
        }
        q.sort((u, v) => {
            return u[1] - v[1];
        });
        if (q.length > 0) {
            let job = q.shift();
            now += job[1];
            answer += now - job[0];
        } else {
            now = jobs[i][0];
        }
    }

    return Math.floor(answer / len);
}