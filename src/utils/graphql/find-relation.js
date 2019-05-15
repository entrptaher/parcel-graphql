export function findRelation(input, rootKey) {
  const key = Object.keys(input[rootKey]);
  const headerKeys = [rootKey, key[0]];
  const relationKeys = Object.keys(input[key[0]]);
  return headerKeys.concat(relationKeys);
}

export function findRelatedKeys(data, rootKey) {
  let relatedKeys = [rootKey];
  if (!data[rootKey]) return relatedKeys;
  for (let rootSelection of Object.keys(data[rootKey])) {
    relatedKeys.push(rootSelection);
    if (data[rootSelection]) {
      for (let subKey of Object.keys(data[rootSelection])) {
        relatedKeys.push(subKey);
      }
    }
  }
  return relatedKeys;
}