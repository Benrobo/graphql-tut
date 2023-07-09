import { ApolloServer } from "@apollo/server";
import GraphqlSchemaTypeDef from "./graphql/schema/index.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { userResolver } from "./graphql/resolvers/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs: GraphqlSchemaTypeDef,
  // resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

await new Promise((resolve) => resolve(httpServer.listen({ port: 4000 })));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
