
function solution(s) {
    let lst = s.split('').sort()
    let answer = []
    while(lst.length) {
        let target = lst.shift()
        if(lst[0] == target) {
            while(lst[0] == target) {
                lst.shift();
            }
        } else {
            answer.push(target)
        }
    }
    return answer.join('')

}
