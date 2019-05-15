import query from "../../query.graphql";

let definitions = query.definitions;
console.log(definitions);
let queriedContents = [];
for (let i = 0; i < definitions.length; i++) {
  if (definitions[i].kind == "OperationDefinition") {
    const Selections = definitions[i].selectionSet.selections;
    for (let i = 0; i < Selections.length; i++) {
      if (Selections[i].selectionSet !== undefined) {
        const deepSelections = Selections[i].selectionSet.selections;
        for (let i = 0; i < deepSelections.length; i++) {
          queriedContents.push(deepSelections[i].name.value);
        }
      }
    }
  }
}

for (let i = 0; i < queriedContents.length; i++) {
  let fragmentSpreds = [];
  const queriedContent = queriedContents[i];
  for (let i = 0; i < definitions.length; i++) {
    if (definitions[i].name.value == queriedContent) {
      const Selections = definitions[i].selectionSet.selections;
      for (let i = 0; i < Selections.length; i++) {
        if (Selections[i].selectionSet !== undefined) {
          const deepSelections = Selections[i].selectionSet.selections;
          for (let i = 0; i < deepSelections.length; i++) {
            fragmentSpreds.push(deepSelections[i].name.value);
          }
        }
      }
    }
  }
  for (let i = 0; i < fragmentSpreds.length; i++) {
    const element = fragmentSpreds[i];
    for (let i = 0; i < definitions.length; i++) {
      if (definitions[i].name.value == element) {
        const Selections = definitions[i].selectionSet.selections;
        for (let i = 0; i < Selections.length; i++) {
          if (Selections[i].selectionSet !== undefined) {
            const spread = Selections[i];
            const deepSelections = Selections[i].selectionSet.selections;
            for (let i = 0; i < deepSelections.length; i++) {
              if (deepSelections[i].name.value == queriedContents[i]) {
                const duplicate = Selections.indexOf(spread);
                Selections.splice(duplicate, 1);
              }
            }
          }
        }
      }
    }
  }
}

import { print } from "graphql/language/printer";
console.log(print(query));