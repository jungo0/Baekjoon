function solution(genres, plays) {
    const genreTotalPlays = new Map(); // 장르별 총 재생 횟수
    const genreSongs = new Map();      // 장르별 곡 목록

    // 1. 장르별 총 재생 횟수 및 곡 정보 집계
    genres.forEach((genre, id) => {
        const play = plays[id];
        
        genreTotalPlays.set(genre, (genreTotalPlays.get(genre) || 0) + play);
        
        if (!genreSongs.has(genre)) {
            genreSongs.set(genre, []);
        }
        genreSongs.get(genre).push({ id, play });
    });

    // 2. 총 재생 횟수 기준 장르 정렬 (내림차순)
    const sortedGenres = [...genreTotalPlays.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([genre]) => genre);

    const answer = [];

    // 3. 정렬된 장르 순서대로 장르 내 곡 정렬 후 최대 2개 수록
    sortedGenres.forEach(genre => {
        const songs = genreSongs.get(genre);
        
        // 장르 내 정렬: 재생 횟수 내림차순 -> 고유 번호 오름차순
        songs.sort((a, b) => {
            if (b.play === a.play) {
                return a.id - b.id; // 재생 횟수 같으면 ID 오름차순
            }
            return b.play - a.play; // 재생 횟수 내림차순
        });

        // 최대 2개까지 수록
        songs.slice(0, 2).forEach(song => answer.push(song.id));
    });

    return answer;
}