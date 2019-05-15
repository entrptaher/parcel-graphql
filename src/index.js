import query from "./query.graphql";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";
import filterUnusedFragments from "./utils/graphql/filter-unused-fragments";

const printObj = gqlObj => console.log(print(gqlObj));
const printStr = gqlStr =>
  console.log(
    gql`
      ${gqlStr}
    `
  );

console.log(query);
printStr(`query posts{ posts { id }}`);
printObj(query);
printObj(filterUnusedFragments(query, "posts"));
