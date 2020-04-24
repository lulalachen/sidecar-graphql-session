import { ApolloServer } from "apollo-server";
import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import DoctorAPI from "./datasource/doctor";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolver"))
);

// console.log({
//   typeDefs,
//   resolvers,
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    DoctorAPI: new DoctorAPI(),
  }),
  context: ({ req }) => {
    return {
      token: req.headers.token,
    };
  },
});

server.listen({ port: process.env.PORT || "5000" }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
