import UserService from "../../service/user-service";

const queries = {
    hello: () => "Hello World"
};

const mutations = {
    createUser: async (_: any, { input }: any) => {
        console.log(input);
        let user = await UserService.createUser(input);
        return user.id;
    },
};

export const resolvers = {
    queries,
    mutations,
};