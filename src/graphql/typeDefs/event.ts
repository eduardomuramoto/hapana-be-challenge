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
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getEvent(id: ID!): Event
    getEvents(
      name: String,
      locationId: ID, 
      locationName: String, 
      sortBy: String, 
      sortDirection: String, 
      page: Int, 
      pageSize: Int, 
      search: String
    ): [Event]
    getUpcomingEvents(
      locationId: ID, 
      locationName: String, 
      sortBy: String, 
      sortDirection: String, 
      page: Int, 
      pageSize: Int, 
      search: String
    ): [Event]
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
      description: String
      tags: [String!]
    ): Event

    deleteEvent(id: ID!): Boolean
  }
`;
