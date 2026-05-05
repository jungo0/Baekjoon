function solution(polynomial) {
    const arr = polynomial.split(' + ');

    let xNum = 0;
    let num = 0;
    // x항과 상수항 값 구하기
    arr.forEach((el) => {
        if(el.includes("x")){
            const xArr = el.split("x");
            if(xArr[0] === ""){
                xNum += 1;
            }

            if(xArr[0] !== ""){
                xNum += Number(xArr[0]);
            }
        }

        if(!el.includes("x")){
            num += Number(el);
        }
    })
    //조건에 맞게 리턴하기
    if(xNum !== 0 && num !== 0){
        return xNum === 1 ? `x + ${num}` : `${xNum}x + ${num}`;    
    }

    if(xNum !== 0 && num === 0){        
        return xNum === 1 ? "x" : `${xNum}x`;
    }

    if(xNum === 0 && num !== 0){
        return `${num}`;
    }
}