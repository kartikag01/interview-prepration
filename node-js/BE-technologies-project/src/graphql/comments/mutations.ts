export const mutations = `#grpgql
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): String

    #createUser(input: CreateUserInput!): String!
    #updateUser(input: UpdateUserInput!): User!
    #deleteUser(input: DeleteUserInput!): User!
`;

