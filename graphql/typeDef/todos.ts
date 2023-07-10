import { gql } from "graphql-tag";

const todosTypeDef = gql`
  type Query {
    getTodos: [Todos]
  }

  type Mutation {
    #
    createTodo(todo: TodoInput!): MutationResponse
    deleteTodo(id: ID!): MutationResponse
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Todos {
    id: ID!
    task: String!
    completed: Boolean
    author: Users!
    createdAt: String!
  }

  input TodoInput {
    name: String!
  }
`;

export default todosTypeDef;
