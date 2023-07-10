import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "../", "graphql", "resolvers", "*.?s"))
);

export default resolvers;
