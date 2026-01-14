function solution(a) {
    let res = 0;
    const leftMin = []; // 왼쪽에서부터 지나온 값들의 최솟값 담기
    const leftMax = []; // 왼쪽에서부터 지나온 값들의 최댓값 담기
    const rightMin = []; // 오른쪽에서부터 지나온 값들의 최솟값 담기
    const rightMax = []; // 오른쪽에서 지나온 값들의 최댓값 담기
    
    // 왼쪽에서 오는 경우의 최소, 최댓값 저장
    for(let i=0; i<a.length; i++) {
        if(i === 0) {
            leftMin[i] = a[i];
            leftMax[i] = a[i];
        } else {
            leftMin[i] = Math.min(a[i], leftMin[i-1]);
            leftMax[i] = Math.max(a[i], leftMax[i-1]);
        }
    }
    
    // 오른에서 오는 경우의 최소, 최댓값 저장
    for(let i=a.length-1; i>=0; i--) {
        if(i === a.length-1) {
            rightMin[i] = a[i];
            rightMax[i] = a[i];
        } else {
            rightMin[i] = Math.min(a[i], rightMin[i+1]);
            rightMax[i] = Math.max(a[i], rightMax[i+1]);
        }
    }
    
    for(let i=0; i<a.length; i++) {
        const target = a[i];
        
        if(i === 0 || i == a.length-1) { // 양 끝은 항상 남기기 가능
            res++;
        } else {
            if(target < leftMin[i-1] || target < rightMin[i+1]) { // 작은 풍선을 터트린 적이 없을 경우, 타겟값보다 하나라도 큰 값이 있으면 됨
                res++;
            } else if(target < leftMax[i-1] && target < rightMin[i+1]) { // 왼쪽에서 작은 풍선을 터트린 적이 있는 경우, 타겟값보다 모두 커야 함
                res++;
            } else if(target < leftMin[i-1] && target < rightMax[i+1]) { // 오른쪽에서 작은 풍선을 터트린 적이 있는 경우, 타겟값보다 모두 커야 함
                res++;
            }
        }
    }
    
    return res;
}