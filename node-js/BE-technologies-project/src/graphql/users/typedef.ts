export const typeDefs = `#graphql

  type User {
    id: String!
    firstName: String! #require
    lastName: String
    email: String!
    profileImageURL: String
    # role: String!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    # role: String!
  }
`;