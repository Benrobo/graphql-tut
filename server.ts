import { ApolloServer } from "@apollo/server";
import GraphqlSchemaTypeDef from "./schema";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userResolver } from "./resolvers";

async function startGqlServer() {
  const resolvers = {
    ...userResolver,
  };
  const server = new ApolloServer({
    typeDefs: GraphqlSchemaTypeDef,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {},
  });
  console.log(`🚀 Server started @ ${url}`);
}

export default startGqlServer;
