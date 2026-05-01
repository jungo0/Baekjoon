function solution(array, height) {
    let result = 0;
    array.map((arr) => height < arr && result++);

    return result;
}
