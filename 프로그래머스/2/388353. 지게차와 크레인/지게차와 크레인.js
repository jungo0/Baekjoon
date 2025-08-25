function solution(storage, requests) {
    const maxRow = storage.length - 1,
        maxColumn = storage[0].length - 1;

    let containerCnt = storage.length * storage[0].length;

    let storageMap = storage.map((string) => {
        return string.split("");
    });
    let isInside = (r, c) => {
        if (r >= 0 && r <= maxRow && c >= 0 && c <= maxColumn) {
            return true;
        }
        return false;
    };

    const isOutside = (row, column) => {
        let dr = [0, 0, 1, -1],
            dc = [1, -1, 0, 0];
        for (let i = 0; i < 4; ++i) {
            let [nearR, nearC] = [row + dr[i], column + dc[i]];
            if (nearR < 0 || nearR > maxRow || nearC < 0 || nearC > maxColumn) {
                return true;
            } else if (nearR >= 0 && nearR <= maxRow && nearC >= 0 && nearC <= maxColumn && storageMap[nearR][nearC] === true) {
                return true;
            }
        }
        return false;
    };

    const resetOutside = () => {
        for (let r = 0; r <= maxRow; ++r) {
            for (let c = 0; c <= maxColumn; ++c) {
                if (isOutside(r, c) && storageMap[r][c] === false) {
                    let arr = [[r, c]];

                    while (arr.length) {
                        let [row, column] = arr.shift();
                        storageMap[row][column] = true;

                        let dr = [0, 0, 1, -1];
                        let dc = [1, -1, 0, 0];

                        for (let i = 0; i < 4; ++i) {
                            let [nearR, nearC] = [row + dr[i], column + dc[i]];

                            if (isInside(nearR, nearC) && isOutside(nearR, nearC) && storageMap[nearR][nearC] === false) {
                                arr.push([nearR, nearC]);
                            }
                        }
                    }
                }
            }
        }
    };

    requests.forEach((request) => {
        let alphabet = request[0];
        resetOutside();
        if (request.length === 1) {
            let pickContainers = [];

            for (let r = 0; r <= maxRow; ++r) {
                for (let c = 0; c <= maxColumn; ++c) {
                    if (isOutside(r, c) && alphabet === storageMap[r][c]) {
                        pickContainers.push([r, c]);
                    }
                }
            }

            pickContainers.forEach(([r, c]) => {
                --containerCnt;
                storageMap[r][c] = true;
            });
        } else {
            for (let r = 0; r <= maxRow; ++r) {
                for (let c = 0; c <= maxColumn; ++c) {
                    if (storageMap[r][c] === alphabet) {
                        --containerCnt;
                        storageMap[r][c] = false;
                    }
                }
            }
        }
    });

    return containerCnt;
}