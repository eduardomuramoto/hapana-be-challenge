import { gql } from 'apollo-server-express';

export const eventTypeDefs = gql`
  type Event {
    id: ID!
    name: String!
    dateTime: String!
    type: String!
    location: Location!
    description: String!
    tags: [String!]
  }

  extend type Query {
    getEvent(id: ID!): Event
    getEvents: [Event]
  }

  extend type Mutation {
    createEvent(
      name: String!
      dateTime: String!
      type: String!
      location: ID!
      description: String!
      tags: [String!]
    ): Event

    updateEvent(
      id: ID!
      name: String
      dateTime: String
      type: String
      location: ID
      description: String
      tags: [String!]
    ): Event

    deleteEvent(id: ID!): Boolean
  }
`;
