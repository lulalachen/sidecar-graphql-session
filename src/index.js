import { ApolloServer } from 'apollo-server'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolver')))

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen({ port: process.env.PORT || '5000' }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
