import UserService from "../../service/user-service";

const queries = {
    getUsers: async () => {
        let users = await UserService.getUsers();
        return users;
    },

    getUser: async (_: any, { id }: any) => {
        let user = await UserService.getUser(id);
        return user;
    },

    getUserToken: async (_: any, payload: { email: string; password: string }) => {
        const token = await UserService.loginUser({
            email: payload.email,
            password: payload.password,
        });
        return token;
    }
};

const mutations = {
    createUser: async (_: any, { input }: any) => {
        let user = await UserService.createUser(input);
        return user;
    },
};

export const resolvers = {
    queries,
    mutations,
};