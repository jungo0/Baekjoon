function solution(routes) {
    routes.sort((a, b) => a[1] - b[1]);

    let cameraCount = 0;
    // 초기 카메라 위치를 가능한 가장 작은 값으로 설정 (-30,001)
    let lastCameraPos = -30001;

    for (const [entry, exit] of routes) {
        // 현재 차량의 진입 지점이 마지막 카메라 위치보다 뒤에 있다면
        if (entry > lastCameraPos) {
            cameraCount++;        // 새 카메라 설치
            lastCameraPos = exit; // 카메라 위치를 현재 차량의 진출 지점으로 업데이트
        }
    }

    return cameraCount;
}