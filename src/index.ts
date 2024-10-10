import express from 'express';
import { createApolloServer } from './config/apolloServer';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 1000, // limit each IP to 1000 requests per window
  message: "Too many requests from this IP, please try again later."
});

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
      app.use(limiter);
      app.use(helmet());
      app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server running at http://localhost:4000${apolloServer.graphqlPath}`)
      );
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
    });
};

startServer();
