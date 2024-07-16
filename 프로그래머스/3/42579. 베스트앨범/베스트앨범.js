function solution(genres, plays) {
  const genreCountMap = new Map();
  const albumsWithIndex = genres.map((genre, idx) => ({
    genre,
    playCount: plays[idx],
    idx,
  }));

  albumsWithIndex.forEach(({ genre, playCount }) => {
    genreCountMap.set(genre, (genreCountMap.get(genre) || 0) + playCount);
  });

  const sortedAlbums = albumsWithIndex.sort((a, b) => {
    if (a.genre !== b.genre)
      return genreCountMap.get(b.genre) - genreCountMap.get(a.genre);
    if (a.playCount !== b.playCount) return b.playCount - a.playCount;
    return a.idx - b.idx;
  });

  const selectedAlbums = new Map();
  const answer = [];

  sortedAlbums.forEach(({ genre, idx }) => {
    const albumCount = selectedAlbums.get(genre) || 0;
    if (albumCount < 2) {
      selectedAlbums.set(genre, albumCount + 1);
      answer.push(idx);
    }
  });

  return answer;
}