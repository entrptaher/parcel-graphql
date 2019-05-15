import query from "../../query.graphql";

let definitions = query.definitions;
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

function makeQueryInline(contents) {
  for (let i = 0; i < contents.length; i++) {
    const content = contents[i];
    for (let i = 0; i < definitions.length; i++) {
      if (definitions[i].name.value == content) {
        const Selections = definitions[i].selectionSet.selections;
        for (let i = 0; i < Selections.length; i++) {
          if (Selections[i].selectionSet !== undefined) {
            let deepSelections = Selections[i].selectionSet.selections;
            for (let i = 0; i < deepSelections.length; i++) {
              const spread = deepSelections[i].name.value;
              for (let i = 0; i < definitions.length; i++) {
                if (definitions[i].name.value == spread) {
                  deepSelections[0] = definitions[i].selectionSet;
                }
              }
            }
          }
        }
      }
    }
  }
  for (let i = 0; i < queriedContents.length; i++) {
    const spreadedQuery = queriedContents[i];
    let selectionSet;
    for (let i = 0; i < definitions.length; i++) {
      if (definitions[i].name.value == spreadedQuery) {
        const selectedSelectionSet = definitions[i].selectionSet;
        selectionSet = selectedSelectionSet;
      }
    }
    let query = definitions[0].selectionSet.selections;
    for (let i = 0; i < query.length; i++) {
      if (query[i].selectionSet !== undefined) {
        query[i].selectionSet = selectionSet;
      }
      
    }
  }
  definitions.length = 1;
}

makeQueryInline(queriedContents);
import { print } from "graphql/language/printer";
console.log(print(query));