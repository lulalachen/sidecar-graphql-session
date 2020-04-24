import { ApolloServer } from 'apollo-server'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { verify } from 'jsonwebtoken'

import createDB from './context/db'

const db = createDB()

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolver')))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      const { uuid } = verify(req.headers.token, 'FLUFFY_CAT')
      const user = await db.users.findOne({ where: { uuid } })
      return { db, user }
    } catch (error) {
      return { db }
    }
  },
})

server.listen({ port: process.env.PORT || '5000' }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
