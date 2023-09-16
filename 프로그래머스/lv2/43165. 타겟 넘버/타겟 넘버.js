function solution(numbers, target) {
    let answer = 0;

    function dfs(num, count) {
        if(count === numbers.length) {
            if(num === target) answer += 1;
            return;
        }

        dfs(num + numbers[count], count + 1);
        dfs(num - numbers[count], count + 1);
    }

    dfs(0, 0);

    return answer;
}
