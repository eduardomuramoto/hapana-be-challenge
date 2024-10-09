import { gql } from 'apollo-server-express';

export const locationTypeDefs = gql`
  type Location {
    id: ID!
    name: String!
  }

  type Query {
    getLocation(id: ID!): Location
    getLocations: [Location]
  }

  type Mutation {
    createLocation(name: String!): Location
    updateLocation(id: ID!, name: String!): Location
    deleteLocation(id: ID!): Boolean
  }
`;
