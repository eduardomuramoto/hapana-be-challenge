import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from '../graphql';

export const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  return server;
};
