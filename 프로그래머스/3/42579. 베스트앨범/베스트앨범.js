function solution(genres, plays) {
    const answer = [];
    const total = {}; // 각 장르별 총 재생 횟수를 저장할 객체
    const summary = {}; // 각 장르별로 노래 정보를 저장할 객체
    
    // 주어진 장르와 재생 횟수를 기반으로 데이터를 정리
    genres.forEach((genre, idx) => {
        // 장르별 총 재생 횟수를 누적
        total[genre] = (total[genre] || 0) + plays[idx];
        
        // 해당 장르에 속한 노래 정보 저장 (노래 id와 재생 횟수)
        if (!summary[genre]) {
            summary[genre] = []; // 해당 장르가 처음 등장하면 빈 배열로 초기화
        } 
        summary[genre].push([idx, plays[idx]]); // 노래 정보 추가
    });

    // 장르를 총 재생 횟수 기준으로 내림차순 정렬
    const sortedGenres = Object.keys(total).sort((a, b) => total[b] - total[a]);

    // 정렬된 장르를 순회하며 각 장르에서 최대 2곡을 선택
    for (const genre of sortedGenres) {
        // 해당 장르의 노래들을 재생 횟수 기준으로 내림차순 정렬
        // 만약 재생 횟수가 같다면 노래 id를 기준으로 오름차순 정렬
        const sortedSongs = summary[genre].sort((a, b) => 
            a[1] === b[1] ? a[0] - b[0] : b[1] - a[1]
        );
        
        // 정렬된 노래 중 상위 2곡의 id 값을 결과 배열에 추가
        answer.push(...sortedSongs.slice(0, 2).map((song) => song[0]));
    }
    
    return answer; // 베스트 앨범에 수록할 노래들의 id 배열 반환
}