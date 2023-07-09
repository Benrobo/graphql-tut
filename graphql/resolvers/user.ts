const userResolvers = {
  Query: {},
  Mutation: {
    createUser: async (e: any) => {
      console.log(e);
    },
    updateUser: async (_: any, args: any) => {
      console.log({ args });
      //   return { code: 200, success: true, message: "welcome" };
    },
  },
};

export default userResolvers;
