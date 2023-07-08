import { gql } from "graphql-tag";

const GraphqlSchemaTypeDef = gql`
  # entry point into the rest schemas.
  type Query {
    # This is where we define all the query that needs to be called from client

    # Get all todos
    getTodos: [Todos]
    getUser(id: ID!): Users
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
`;

export default GraphqlSchemaTypeDef;
