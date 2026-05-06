function solution(dots) {
    const [a,b,c,d] = dots
    
    if (calculateSlope(a,b) === calculateSlope(c,d))
        return 1;
    if (calculateSlope(a,c) === calculateSlope(b,d))
        return 1;
    if (calculateSlope(a,d) === calculateSlope(b,c))
        return 1;
    return 0;
}

function calculateSlope(arr1, arr2) {
    return (arr2[1] - arr1[1]) / (arr2[0] - arr1[0]);
}