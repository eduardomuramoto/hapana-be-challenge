import express from 'express';
import cors from 'cors';  // Import CORS
import { createApolloServer } from './config/apolloServer';

const startServer = async () => {
  const app = express() as any;

  // Enable CORS
  app.use(cors());

  const apolloServer = await createApolloServer();

  // Apply Apollo GraphQL middleware to Express
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // Start the server
  app.listen({ port: 4000 }, () => {
    console.log(`Server running on http://localhost:4000/graphql`);
  });
};

startServer();
