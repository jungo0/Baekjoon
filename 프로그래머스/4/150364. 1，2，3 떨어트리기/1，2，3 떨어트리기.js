
function solution(edges, target) {
  const tree = {};
  const lastVisited = {};

  for (let i = 0; i < edges.length; i++) {
    if (!tree[edges[i][0]]) {
      tree[edges[i][0]] = [edges[i][1]];
      lastVisited[edges[i][0]] = -1;
    } else {
      tree[edges[i][0]].push(edges[i][1]);
    }
  }

  for (key in tree) {
    tree[key].sort((a, b) => a - b);
  }

  let leafOrder = {};

  for (let i = 0; i < tree[1].length; i++) {
    treeTraverse(tree[1][i]);
  }

  function treeTraverse(cur) {
    if (!tree[cur]) {
      leafOrder[cur] = [];
      return;
    }

    for (let i = 0; i < tree[cur].length; i++) {
      treeTraverse(tree[cur][i]);
    }
  }


  let count = 0;

  let normalEnd = true;

  while (1) {
    let canEnd = false;

    for (let key in leafOrder) {
      if (leafOrder[key].length * 1 <= target[key - 1] && leafOrder[key].length * 3 >= target[key - 1]) {
        canEnd = true;
      }
      else if (leafOrder[key].length * 1 >= target[key - 1]) {
        canEnd = true;
        normalEnd = false;
        break;
      } else {
        canEnd = false;
        break;
      }
    }

    if (canEnd) {
      break;
    }

    let next = tree[1][++lastVisited[1] % tree[1].length];


    while (1) {
      if (!tree[next]) {
        leafOrder[next].push(count + 1);
        count++;
        break;
      }

      else {
        lastVisited[next] += 1;
        next = tree[next][lastVisited[next] % tree[next].length];
      }
    }
  }

  let realOrder = {};

  if (normalEnd) {
    for (let key in leafOrder) {
      let start = target[key - 1] - leafOrder[key].length;
      let array = new Array(leafOrder[key].length).fill(1);
      let idx = 0;

      while (1) {
        if (start === 0) {
          break;
        }

        if (start >= 2) {
          array[idx] += 2;
          start -= 2;
          idx++;
        } else {
          array[idx] += 1;
          start -= 1;
          idx++;
        }
      }

      realOrder[key] = [...array].sort();
    }

    let answer = [];

    for (let i = 1; i < count + 1; i++) {
      for (let key in leafOrder) {
        if (leafOrder[key].includes(i)) {
          answer.push(realOrder[key].shift());
        }
      }
    }

    return answer;
  } else {
    return [-1];
  }
}
