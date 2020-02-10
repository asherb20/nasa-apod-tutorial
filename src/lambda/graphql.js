import { ApolloServer } from 'apollo-server-lambda'
import { typeDefs, resolvers } from '../graphql/schema'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
