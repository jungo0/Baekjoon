// function solution(numbers) {
//     return numbers.map(item => item*2);
// }

function solution(numbers){
    var answer = [];
    let cnt = 0;
    while(cnt < numbers.length){
        answer.push(numbers[cnt] *2 )
        cnt = cnt+1;
    }
return answer;
}



// 배열 numbers
// 1. 원소 꺼내야함
// 2. 원소를 꺼내 2배를 한 후 새 배열에 넣어줘야함