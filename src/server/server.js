const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const resolvers = require('./resolvers');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Station {
    bikes: Int!
    free: Int!
    lat: Float!
    lng: Float!
    name: String!
    number: Int!
    operative: Boolean!
    total: Int!
  }

  input StationsInput {
    lat: Float!
    lng: Float!
  }

  type Query {
    stations(stationInput: StationsInput): [Station!]!
  }
`;

// // Provide resolver functions for your schema fields
// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//   },
// };

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
server.applyMiddleware({app});

app.listen({port: 4000}, () =>
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
