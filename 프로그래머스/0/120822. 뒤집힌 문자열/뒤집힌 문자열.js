function solution(my_string,leter) {
    var answer = '';
    let cnt = my_string.length -1;
    while(cnt >=0){
        answer += my_string[cnt]
        cnt = cnt-1
        }
    return answer;
}






// 2
// 3
// 4
// 5
// function solution(my_string) {
//     var answer = [...my_string].reverse().join("");
//     return answer;
// }