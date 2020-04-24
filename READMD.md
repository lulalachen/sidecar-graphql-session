# Cheatsheet

## `src/index.js`

```
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import DoctorAPI from './datasource/doctor'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolver')))

// console.log({
//   typeDefs,
//   resolvers,
// });

```
