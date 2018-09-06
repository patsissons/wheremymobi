import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { Prisma, Station } from "./generated/prisma";
import { Context } from "./utils";

const StationWithStatusFragment =
  "{ id, createdAt, updatedAt, name, lat, lng, status(last: 1) { id, createdAt, updatedAt, operative, total, free, bikes } }";

function stationWithStatus(station: Station) {
  const { status, ...stationInfo } = station;

  return {
    ...stationInfo,
    status: status[0]
  };
}

const resolvers = {
  Query: {
    async stations(parent, args, context: Context, info) {
      const stations = await context.db.query.stations(
        {},
        StationWithStatusFragment
      );

      return stations.map(stationWithStatus);
    },
    async station(parent, { id }, context: Context, info) {
      const station = await context.db.query.station(
        { where: { id } },
        StationWithStatusFragment
      );

      return stationWithStatus(station);
    },
    stationHistory(parent, { id }, context: Context, info) {
      return context.db.query.station({ where: { id } }, info);
    }
  },
  Mutation: {
    createStation(
      parent,
      { name, lat, lng, operative, total, free, bikes },
      context: Context,
      info
    ) {
      return context.db.mutation.createStation(
        {
          data: {
            name,
            lat,
            lng,
            status: { create: { operative, total, free, bikes } }
          }
        },
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
