import { ApolloServer } from 'apollo-server'

const typeDefs = `

`

const resolvers = {}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen({ port: process.env.PORT || '5000' }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
