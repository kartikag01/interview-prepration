import { ApolloServer } from "@apollo/server";
import { User } from './users';
import { Posts } from './posts';
import { readFileSync } from "node:fs";

// const userTypeDefs = readFileSync(require.resolve('./users/schema.graphql'), { encoding: 'utf-8' });
// const postTypeDefs = readFileSync(require.resolve('./posts/schema.graphql'), { encoding: 'utf-8' });
// console.log(postTypeDefs)


async function createApolloGraphQLServer() {
    const server = new ApolloServer({
        // typeDefs: { ...userTypeDefs, ...postTypeDefs },
        // Schema
        typeDefs: `
            ${User.typeDefs}
            ${Posts.typeDefs}
            
            type Query {
                ${User.queries}
                ${Posts.queries}
            }

            type Mutation {
                ${User.mutations}
                ${Posts.mutations}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Posts.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Posts.resolvers.mutations
            },
        }
    });

    await server.start();

    return server
}

export default createApolloGraphQLServer;