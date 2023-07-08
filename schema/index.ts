import { gql } from "graphql-tag";

const GraphqlSchemaTypeDef = gql`
  # QUERY
  # entry point into the rest schemas.
  type Query {
    # This is where we define all the query that needs to be called from client

    # Get all todos
    getTodos: [Todos]
    getUser(id: ID!): Users
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Mutation {
    createUser(user: CreateUserInput): MutationResponse
  }

  type Users {
    id: ID!
    username: String!
    email: String!
  }

  type Todos {
    id: ID!
    task: String!
    completed: Boolean
    author: Users!
    createdAt: String!
  }

  # The input type is same as the other types, only difference is , it meant to accept input from gql query / mutation
  input CreateUserInput {
    username: String!
    email: String!
  }
`;

export default GraphqlSchemaTypeDef;
