const solution = (n) => {
    let piece = 6

    while(true) {
        if (piece % n === 0) {
            break
        }
        piece += 6
    }

    return piece / 6
}



// function solution(n) {
//   	// 한 판에 여섯 조각
//     let pizzaBox = 6
//     // 같은 수로 나눠질 때까지 +6
//     while(pizzaBox%n !== 0) {
//         pizzaBox+=6
//     } 
//   	// 박스 수 반환
//     return pizzaBox/6
// }