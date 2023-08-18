function solution(clothes) {
    const clothesMap = {};
    let answer = 1;
    // 의상 종류별로 갯수를 저장
    clothes.forEach(arr => {    //clothes 배열을 순회하면서 각 요소를 arr배열에 할당하고 코드 블록을 실행. arr은 clothes 배열의 각 요소를 나타내는 임시 변수
        const [type, name] = arr;
        if(clothesMap.hasOwnProperty(name)) {	//clothesMap 객체에 name이라는 속성이 있는지 확인하는 조건문
            clothesMap[name]++;    	//이미 존재한다면 해당 종류의 이상 개수를 1증가
        }
        else {
            clothesMap[name] = 1;  //객체에 해당 종류의 의상이 존재하지 않는 경우, 해당 의상이 처음으로 추가되는 것이므로 name 속성을 추가하고 1로 초기화
        }
    })

    for(const key in clothesMap) {
        // 해당 종류의 의상을 입지 않는 경우도 고려하여, 의상 개수에 1을 더한 값을 answer에 곱하기
      //key는 각 속성의 이름을 나타내는 변수. clothesMap 객체에 저장된 의상 종류별 개수를 처리하는 역할
        answer *= (clothesMap[key] + 1);		//clothesMap[key]는 key에 해당하는 속성 값, 즉 의상 종류별 개수를 나타냄.
    }
    // 모든 종류의 의상에 대한 처리가 완료되면, 모든 의상을 입지 않는 경우를 제외하기 위해 answer에서 1을 빼고 반환
    return answer - 1;
}