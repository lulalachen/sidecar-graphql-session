import { ApolloServer } from 'apollo-server'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

import AuthAPI from './datasource/AuthAPI'
import DoctorAPI from './datasource/DoctorAPI'
import createDB from './context/db'

const db = createDB()

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolver')))
const dataSources = () => ({
  AuthAPI: new AuthAPI(),
  DoctorAPI: new DoctorAPI(),
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: async ({ req }) => {
    try {
      return { db, token: req.headers.token }
    } catch (error) {
      return { db }
    }
  },
})

server.listen({ port: process.env.PORT || '5000' }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
