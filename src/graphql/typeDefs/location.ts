import { gql } from 'apollo-server-express';

export const locationTypeDefs = gql`
  type Location {
    id: ID!
    name: String!
    type: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getLocation(id: ID, name: String): Location
    getLocations: [Location]
  }

  type Mutation {
    createLocation(name: String!, type: String!): Location
    updateLocation(id: ID!, name: String!, type: String!): Location
    deleteLocation(id: ID!): Boolean
  }
`;