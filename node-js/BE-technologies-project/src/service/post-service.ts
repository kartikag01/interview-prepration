import { prismaClient } from "../db/db-config";

class PostService {
    public static getPosts() {
        return prismaClient.posts.findMany();
    }

    public static getPost(postId: string) {
        return prismaClient.posts.findUnique({
            where: {
                id: postId,
            },
        });
    }

    public static async createPost(post: any) {
        return await prismaClient.posts.create({
            data: { ...post },
        });
    }
}

export default PostService;