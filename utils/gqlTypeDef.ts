import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "../", "graphql", "typeDef", "*.?s"))
);

export default typeDefs;
