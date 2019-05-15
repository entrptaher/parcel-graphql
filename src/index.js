import query from './query.graphql'
console.log(query)

import gql from "graphql-tag";
console.log(gql`query posts{ posts { id }}`)

import { print } from "graphql/language/printer";
console.log(print(query))


