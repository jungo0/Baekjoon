function union(nodeA, nodeB, list) {
  const result = [...list]

  const linkA = find(nodeA, list)
  const linkB = find(nodeB, list)

  linkA <= linkB ? (result[linkB] = linkA) : (result[linkA] = linkB)

  return result
}

function find(node, list) {
  if (node === list[node]) {
    return node
  }

  list[node] = find(list[node], list)
  return list[node]
}

function isLinked(nodeA, nodeB, list) {
  return find(nodeA, list) === find(nodeB, list)
}

function checkAllLink(list) {
  if (list.length === 1) {
    return true
  }

  for (let i = 0; i < list.length - 1; i++) {
    if (find(i, list) !== find(i + 1, list)) {
      return false
    }
  }

  return true
}

function solution(n, costs) {
  const sortedCosts = [...costs]
  let islandLink = []
  let result = 0

  for (let i = 0; i < n; i++) {
    islandLink[i] = i
  }

  sortedCosts.sort((costA, costB) => {
    return costA[2] - costB[2]
  })

  for (const [islandA, islandB, cost] of sortedCosts) {
    if (isLinked(islandA, islandB, islandLink)) {
      continue
    }

    result += cost
    islandLink = union(islandA, islandB, islandLink)

    if (checkAllLink(islandLink)) {
      break
    }
  }

  return result
}