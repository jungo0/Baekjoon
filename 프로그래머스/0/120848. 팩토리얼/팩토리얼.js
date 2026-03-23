function solution(n) {
    let result = 0
    // 제한사항의 최대 값이 10의 팩토리얼이기 때문에 10번 반복
    for(let i = 1 ; i <= 10; i++) {
        // n이 i의 팩토리얼보다 크다면 진행하여 최대 i를 구함
        if(n >= getFacto(i)) {
            result = i
            continue
        } else {
            break
        }
    }
    return result
}
// 팩토리얼을 구하는 함수
function getFacto(num) {
    // 재귀를 통해 n*n-1... 을 구현함
    if(num > 1) return num*getFacto(num-1)
    return num
}