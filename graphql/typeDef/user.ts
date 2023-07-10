import { gql } from "graphql-tag";

const userTypeDef = gql`
  type Query {
    getUser(id: ID!): Users
  }

  type Mutation {
    createUser(user: CreateUserInput): MutationResponse
    updateUser(user: CreateUserInput): MutationResponse
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Users {
    id: ID!
    username: String!
    email: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
  }
`;

export default userTypeDef;
