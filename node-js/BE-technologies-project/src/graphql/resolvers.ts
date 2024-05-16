import { AddUserInput, User } from '../types/types';

const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'user' },
];

const resolvers = {
    Query: {
        // getPost: () => 'Hello from GQ!',
        // getAuthor: () => 'Hello from GQ!',
    },
    Mutation: {
        // addAuthor: (_parent: any, { input }: { input: AddUserInput }): User => {
        //     return { id: '1', ...input };
        // },
        // addUser: (_parent: any, { input }: { input: AddUserInput }): User => {
        //     const id = String(users.length + 1);
        //     const user = { id, ...input };
        //     users.push(user);
        //     return user;
        // },
    },
    Subscription: {
        userAdded: {
            subscribe: (_parent: any, _args: any, { pubsub }: any) => {
                return pubsub.asyncIterator('userAdded');
            },
        },
    }
};

export default resolvers;