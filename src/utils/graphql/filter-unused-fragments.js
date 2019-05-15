import { findRelation, findRelatedKeys } from "./find-relation";

export default function filterUnusedFragments(input, rootQuery) {
  let queries = JSON.parse(JSON.stringify(input))
  let levels = {};
  for (let definition of queries.definitions) {
    if (!levels[definition.name.value]) {
      levels[definition.name.value] = {};
    }

    const definitionSelections = definition.selectionSet.selections;

    for (let selection of definitionSelections) {
      const neestedSelections =
        selection.selectionSet && selection.selectionSet.selections;

      if (neestedSelections) {
        for (let nestedSelection of neestedSelections) {
          levels[definition.name.value][nestedSelection.name.value] = {};
        }
      }
    }
  }
  const acceptedKeys = findRelatedKeys(levels, rootQuery);
  queries.definitions = queries.definitions.filter(
    e => acceptedKeys.indexOf(e.name.value) > -1
  );
  return queries;
}