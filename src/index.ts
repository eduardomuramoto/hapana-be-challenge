import express from 'express';
import { createApolloServer } from './config/apolloServer';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

const startServer = async () => {
  const app = express() as any;
  const apolloServer = await createApolloServer();

  // Apply Apollo GraphQL middleware to Express
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // Start the server
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log('MongoDB connected');
      app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server running at http://localhost:4000${apolloServer.graphqlPath}`)
      );
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
    });
};

startServer();
