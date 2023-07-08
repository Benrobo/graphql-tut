import { ApolloServer } from "@apollo/server";
import GraphqlSchemaTypeDef from "./schema";
import { startStandaloneServer } from "@apollo/server/standalone";

async function startGqlServer() {
  const server = new ApolloServer({ typeDefs: GraphqlSchemaTypeDef });
  const { url } = await startStandaloneServer(server);
  console.log(`🚀 Server started @ ${url}`);
}

export default startGqlServer;
