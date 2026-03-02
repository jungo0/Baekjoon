function solution(n) {
    var oneTwoFourArr = [4,1,2];
    var answer = '';
    while(true){
        if((Math.floor(n/3)===1&&n%3===0)||(Math.floor(n/3)===0)){
            answer+=oneTwoFourArr[n%3];
            break;
        }
        answer+=oneTwoFourArr[n%3];
        if(Math.floor(n%3)===0){
            n = Math.floor(n/3)-1;
        }
        else{
            n = Math.floor(n/3);
        }      
    }
    return answer.split("").reverse().join("");
}
