export const typeDefs = `#graphql
    type Post {
      id: String!
      title: String!
      description: String!
    }

    input CreatePostInput {
      title: String!
      description: String!
      # user: userInput
    }
`;

// export const CreatePostInput