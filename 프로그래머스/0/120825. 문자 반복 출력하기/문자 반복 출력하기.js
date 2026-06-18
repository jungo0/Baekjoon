const solution = (my_string, n) => {
    var answer = "";
    let cnt = 0;
    
    while(cnt < my_string.length){
        const char = my_string[cnt]; // 현재 글자 (변수명을 명확하게 char로 변경)
         
        let repeatCnt = 0;
        // 문자가 아니라 카운터 변수(repeatCnt)가 n보다 작을 때 동안 반복해야 합니다.
        while(repeatCnt < n){
            answer = answer + char;
            repeatCnt = repeatCnt + 1; // 카운터 증가
        }
        cnt = cnt + 1; // 다음 글자로 인덱스 증가 (오타 수정)
    }
     
    return answer;
}