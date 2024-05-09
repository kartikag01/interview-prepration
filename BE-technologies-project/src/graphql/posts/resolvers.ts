import PostService from "../../service/post-service";
import UserService from "../../service/user-service";

const queries = {
    getPosts: async () => {
        let posts = await PostService.getPosts();
        return posts;
    },

    getPost: async (_: any, { id }: any) => {
        let post = await PostService.getPost(id);
        return post;
    },
};

const mutations = {
    createPost: async (_: any, { input }: any) => {
        console.log(input);
        let post = await PostService.createPost(input);
        console.log(post);
        return post;
    },
};

export const resolvers = {
    queries,
    mutations,
};