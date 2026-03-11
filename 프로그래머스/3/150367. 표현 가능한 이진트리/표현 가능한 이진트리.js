function solution(numbers) {
    let answer = [];
 
    numbers.forEach(number => {
        let data = number.toString(2);
        let size = Math.pow(2, Math.floor(Math.log2(data.length)) + 1) - 1;
 
        data = '0'.repeat(size - data.length) + data;
        answer.push(checkTree(data))
    });
 
    return answer;
}
 
function checkTree(number) {
    let len = (number.length - 1) / 2;
    if(len === 0)   return 1;
    let left = number.substr(0, len);
    let right = number.substr(len + 1, len);
 
    if(number[len] === '0')   return (+left === 0 && +right === 0 ? 1 : 0);
    return checkTree(left) && checkTree(right);
}