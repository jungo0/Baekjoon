
function solution(n) {
    var answer = 0, count = 1, i = 1;
    while(count <= n){
        i++, answer++;
        count = count * i;
    }

    return answer;
}