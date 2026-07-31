function solution(my_string) {
    let answer = '';
    let alpa=['a','e','i','o','u']
    for(let i=0;i<my_string.length;i++){
        if(!alpa.includes(my_string[i])){
            answer+=my_string[i]
        }
    }
    return answer;
}

