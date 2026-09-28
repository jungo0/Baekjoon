function solution(genres, plays) {
    const genrePlayCount = new Map();
    const genreSongs = new Map();

    genres.forEach((genre, id) => {
        const play = plays[id];
        genrePlayCount.set(genre, (genrePlayCount.get(genre) || 0) + play);
        
        if (!genreSongs.has(genre)) {
            genreSongs.set(genre, []);
        }
        genreSongs.get(genre).push({ id, play });
    });

    return [...genrePlayCount.entries()]
        .sort((a, b) => b[1] - a[1]) // 총 재생수 내림차순 정렬
        .flatMap(([genre]) => {
            return genreSongs.get(genre)
                .sort((a, b) => b.play - a.play || a.id - b.id) // 재생수 내림차순, 같으면 id 오름차순
                .slice(0, 2)
                .map(song => song.id);
        });
}