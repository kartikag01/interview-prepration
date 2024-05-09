export const queries = `#grpahql
    getUsers: [User],
    getUser(id: String): User

    getUserToken(email: String!, password: String!): String
`;