function solution(num_list, n) {
    const  answer = [];
     let list = [];
    for(let i =0;i<num_list.length;i++){
      const item = num_list[i];
        list.push(item);
        if(list.length === n){
            answer.push(list);
            list = []
        }
       
    }
    return answer;
}



// function solution(num_list, n) {
//     const result = []
//     for(let i = 0 ; i < num_list.length; ) {
//         const sliceN = []
//         for(let j = 0 ; j < n ; j++) {
//             sliceN.push(num_list[i])
//             i++
//         }
//         result.push(sliceN)
//     }
//     return result
// }
