import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { Prisma } from "./generated/prisma";
import { Context } from "./utils";

const resolvers = {
  Query: {
    stations(parent, args, context: Context, info) {
      return context.db.query.stations({}, info);
    }
  },
  Mutation: {
    createStation(parent, { name, lat, lng }, context: Context, info) {
      return context.db.mutation.createStation(
        { data: { name, lat, lng } },
        info
      );
    },
    updateStationLocation(parent, { id, lat, lng }, context: Context, info) {
      return context.db.mutation.updateStation(
        { data: { name, lat, lng }, where: { id } },
        info
      );
    },
    publishStationStatus(
      parent,
      { id, operative, total, free, bikes },
      context: Context,
      info
    ) {
      return context.db.mutation.createStationStatus(
        {
          data: { station: { connect: { id } }, operative, total, free, bikes }
        },
        info
      );
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: "https://us1.prisma.sh/pat-sissons-fe92fd/where-my-mobi/dev", // the endpoint of the Prisma API
      debug: true // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    })
  })
});
server.start(() => console.log("Server is running on http://localhost:4000"));
