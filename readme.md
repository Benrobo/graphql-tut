## Graphql

This is just me trying to learn graphql to solve my problems REST api couldn't solve..

### Resources

[Graphql Tutorial 4hrs long](https://www.youtube.com/watch?v=yqWzCV0kU_c) .
[Apolo Odyssey Tutorial](https://www.apollographql.com/tutorials/lift-off-part1/01-feature-overview-and-setup) .
[Graphql Javascript SDK](https://graphql.org/code/#javascript) .
[Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started)

## Basic Concept

**GraphQL** is a modern `query language` and `runtime` that allows clients to efficiently request and retrieve data from servers.
It provides a flexible and efficient alternative to traditional `RESTful APIs`. With GraphQL, clients can specify the exact data they need, eliminating over-fetching or under-fetching of data.

Why is graphql referred to as `query language` and `runtime`? well:

- **Query Language**:

  - GraphQL provides a syntax and set of operations for clients to express their data requirements.
  - Clients can write queries that define the structure and fields of the data they need.
  - It allows clients to retrieve data in a specific shape, eliminating the need to receive excessive or unnecessary data.

- **Runtime**:

  - GraphQL includes a runtime environment that interprets and executes the queries received from clients.
  - The runtime resolves queries by fetching data from various data sources, such as databases or APIs.
  - It handles the process of gathering and combining data from multiple sources into a single response.

### Syntax

Graphql really has a beautiful syntax either when `querying` or `mutating`. Here are some examples using live version of a graphql studio:

[Live GQL Playground](https://countries.trevorblades.com/)

Every graphql request begins with a root denoted by `{..graphql queries..}`

- Querying for country
  ```js
    {
        country(code: "NG") {
            name
            currencies
            emoji
            emojiU
            native
        }
    }
  ```

That should return a response that corresponds to this response below:

```js
{
  "data": {
    "country": {
      "name": "Nigeria",
      "currencies": [
        "NGN"
      ],
      "emoji": "🇳🇬",
      "emojiU": "U+1F1F3 U+1F1EC",
      "native": "Nigeria"
    }
  }
}
```

## Apollo Server

Apollo Server is an open-source GraphQL server that provides a runtime environment for building and serving GraphQL APIs. It allows developers to create robust and performant GraphQL servers with ease.

![image](https://www.apollographql.com/docs/c5e2d4db4b0b5568a87ebf082ffe79e6/frontend_backend_diagram.svg)

**You can use Apollo Server as:**

- The GraphQL server for a subgraph in a federated supergraph. This allows you to combine multiple GraphQL APIs into a unified schema.
- A stand-alone GraphQL server
- An add-on to your application's existing Node.js middleware (such as Express, AWS Lambda, or Fastify)

**Apollo Server provides:**

- Straightforward setup, so your client developers can start fetching data quickly
- Incremental adoption, enabling you to add features as they're needed
- Universal compatibility with any data source, any build tool, and any GraphQL client
- Production readiness, enabling you to confidently run your graph in production

Apollo Server requires some base config when invoking `ApolloServer` class from `@apollo-server` package. Some of this fields are:

`typeDefs` and `resolvers`

To explain this in a beginner-friendly way:

1. `typeDefs`: Think of `typeDefs` as a `blueprint` or a recipe that describes the `structure` and `capabilities` of your GraphQL API. It's like creating a menu for a restaurant. In GraphQL, you define different types, such as "User," "Post," or "Comment," along with their fields and relationships. For example, a "User" type may have fields like "name," "email," and "age." This defines what information can be requested from your API and what it looks like. `typeDefs` is where you write these type definitions using a special syntax that GraphQL understands.

2. `resolvers`: Now that you have defined the types and their fields in `typeDefs`, you need a way to actually fetch the data when a client requests it. This is where `resolvers` come in. Think of `resolvers` as the functions that fulfill the requests made by clients. Each field in your type definitions corresponds to a resolver function. When a client asks for specific data, the resolver for that field is called to retrieve the data and return it to the client. Resolvers act like the chefs in a restaurant kitchen, preparing the dishes requested by the customers. They fetch data from databases, APIs, or any other data sources and assemble the requested information in the format defined in `typeDefs`.

In summary, `typeDefs` defines the structure and capabilities of your GraphQL API, similar to creating a menu, while `resolvers` are the functions that fetch the data and prepare the responses for each field, like the chefs in a restaurant kitchen. Together, they form the core components of your GraphQL server, allowing clients to request and receive the data they need in a structured and efficient manner.

# Project structures

> Note!! There is no definite code structure when developing API, but for the purpose of this tutorial, we would use this structure:

breakdown of the code structure, including the integration of `MongoDB` and the interaction between the `controllers` and the `GraphQL API`:

```markdown
├── src
│ ├── schema
│ │ └── schema.graphql
│ ├── resolvers
│ │ ├── userResolver.ts
│ │ └── postResolver.ts
│ ├── controllers
│ │ ├── userController.ts
│ │ └── postController.ts
│ ├── models
│ │ ├── User.ts
│ │ └── Post.ts
│ ├── dataSources
│ │ └── RESTDataSource.ts
│ ├── utils
│ │ └── auth.ts
│ ├── server.ts
│ └── index.ts
├── .env
├── .gitignore
├── tsconfig.json
└── package.json
```

Now, let's delve into the integration of controllers with the GraphQL API:

1. **`src/controllers/`**: This directory contains the controllers that handle the business logic and interact with the MongoDB models.

   - `userController.ts`: This file contains the controller functions related to user operations such as creating, updating, and retrieving users from the MongoDB database.

   ```typescript
   import { User } from "../models/User";

   export const userController = {
     createUser: async (userData: User): Promise<User> => {
       // Logic to create a new user in the MongoDB database
     },
     updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
       // Logic to update a user in the MongoDB database
     },
     getUserById: async (id: string): Promise<User | null> => {
       // Logic to retrieve a user by ID from the MongoDB database
     },
     // Other controller functions for user-related operations
   };
   ```

   - `postController.ts`: This file contains the controller functions related to post operations such as creating, updating, and retrieving posts from the MongoDB database.

   ```typescript
   import { Post } from "../models/Post";

   export const postController = {
     createPost: async (postData: Post): Promise<Post> => {
       // Logic to create a new post in the MongoDB database
     },
     updatePost: async (id: string, postData: Partial<Post>): Promise<Post> => {
       // Logic to update a post in the MongoDB database
     },
     getPostById: async (id: string): Promise<Post | null> => {
       // Logic to retrieve a post by ID from the MongoDB database
     },
     // Other controller functions for post-related operations
   };
   ```

2. **`src/models/`**: This directory contains the MongoDB models that define the schema and structure of the data.

   - `User.ts`: This file defines the User model and its corresponding schema for storing user-related data in the MongoDB database.

   ```typescript
   import { model, Schema, Document } from "mongoose";

   export interface User extends Document {
     name: string;
     email: string;
     // Other user fields
   }

   const userSchema = new Schema<User>({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     // Other user fields and their validation rules
   });

   export const UserModel = model<User>("User", userSchema);
   ```

   - `Post.ts`: This file defines the Post model and its corresponding schema for storing post-related data in the MongoDB database.

   ```typescript
   import { model, Schema, Document } from "mongoose";

   export interface Post extends Document {
     title: string;
     content: string;
     // Other post fields
   }

   const postSchema = new Schema<Post>({
     title: { type: String, required: true },
     content: { type: String, required: true },
     // Other post fields and their validation rules
   });

   export const PostModel = model<Post>("Post", postSchema);
   ```

3. The controller functions can be called from the resolver functions in the `src/resolvers/` directory to perform the necessary operations on the MongoDB models.

   - For example, in `userResolver.ts`:

   ```typescript
   import { userController } from "../controllers/userController";

   const resolvers = {
     Query: {
       user: (_, { id }) => userController.getUserById(id),
       // Other user-related resolver functions
     },
     Mutation: {
       createUser: (_, { input }) => userController.createUser(input),
       updateUser: (_, { id, input }) => userController.updateUser(id, input),
       // Other user-related resolver functions
     },
   };

   export default resolvers;
   ```

4. The MongoDB connection and setup can be handled in the `src/dataSources/` directory using a data source class like `RESTDataSource.ts` (or a custom data source).

   - In this class, you can establish a connection to the MongoDB database and define methods to interact with the database.

   - The data source class can be utilized by the controllers to perform database operations efficiently.

This breakdown demonstrates how the controllers can be integrated with the GraphQL API to handle the business logic and interact with the MongoDB models. The controllers handle CRUD operations on the models, and the resolver functions in the GraphQL resolvers invoke the corresponding controller functions when processing the GraphQL queries and mutations.

I hope this provides you with a clear understanding of the integration between controllers and the GraphQL API within the given code structure.
