import { GraphQLArgs } from "graphql";

const todosResolvers = {
  Query: {
    getTodos: async () => {
      return [];
    },
  },
  Mutation: {
    createTodo: async (e: any) => {
      // console.log(e);
    },
    deleteTodo: async (_: any, args: GraphQLArgs) => {
      console.log({ args });
      //   return { code: 200, success: true, message: "welcome" };
    },
  },
};

export default todosResolvers;
