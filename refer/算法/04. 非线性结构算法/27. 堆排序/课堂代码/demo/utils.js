const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};
function defaultCompare(a, b) {
  if (a === b) return Compare.EQUALS;
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}

function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a);
}

module.exports = {
  defaultCompare,
  Compare,
  swap,
  reverseCompare
};
