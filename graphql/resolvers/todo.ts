import { GraphQLArgs } from "graphql";

const todosResolvers = {
  Query: {
    getTodos: async () => {
      return [];
    },
  },
  Mutation: {
    createTodo: async (_: any, args: GraphQLArgs) => {
      try {
        const name = (args as any)?.todo?.name;
        return { name };
      } catch (e: any) {
        throw new Error(`Error creating`);
      }
    },
    deleteTodo: async (_: any, args: GraphQLArgs) => {
      console.log({ args });
      //   return { code: 200, success: true, message: "welcome" };
    },
  },
};

export default todosResolvers;
