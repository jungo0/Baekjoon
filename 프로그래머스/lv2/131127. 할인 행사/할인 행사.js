function solution(want, number, discount) {
  var answer = 0;
  
  const isMatch = (arr) => { // 할인 품목과 원하는 제품이 일치하는지 확인하는 함수
      var map = new Map();   // 매번 map을 초기화 해준다.
      arr.forEach(v=>map.set(v,(map.get(v)||0)+1)); // 할인 품목들을 map에 셋팅한다.
      for(let i = 0; i < want.length; i++){
          if(map.get(want[i])!==number[i]) return false;
      }             // 원하는 품목의 수량과 할인 품목이 일치하지 않으면 false
      return true;  // 일치하면 true를 리턴한다
  }
  
  for(let j = 0; j <= discount.length - 10; j++){
      var arr = discount.slice(j, j+10); // 10일동안 할인이 되므로 10개씩 배열을 잘라준다.
      if(isMatch(arr)){
          answer++;
      } 
  }
    return answer;
}
