function solution(genres, plays) {
    const genreTotalMap = {}; // 장르별 총 재생 횟수
    const genreSongsMap = {}; // 장르별 곡 정보 목록 [{ id, play }, ...]

    genres.forEach((genre, id) => {
        const play = plays[id];
        
        genreTotalMap[genre] = (genreTotalMap[genre] || 0) + play;
        
        if (!genreSongsMap[genre]) {
            genreSongsMap[genre] = [];
        }
        genreSongsMap[genre].push({ id, play });
    });

    const sortedGenres = Object.keys(genreTotalMap).sort((a, b) => {
        return genreTotalMap[b] - genreTotalMap[a];
    });

    const answer = [];

    sortedGenres.forEach(genre => {
        const songs = genreSongsMap[genre];
        
        songs.sort((a, b) => {
            if (b.play === a.play) {
                return a.id - b.id;
            }
            return b.play - a.play;
        });

        songs.slice(0, 2).forEach(song => answer.push(song.id));
    });

    return answer;
}