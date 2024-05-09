import { User } from "../types/types";
import { prismaClient } from "./../db/db-config";
import { createHmac, randomBytes } from "node:crypto";
import jsonwebtoken from "jsonwebtoken";

export interface CreateUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    // role: string;
}

export interface GetUserTokenPayload {
    email: string;
    password: string;
}

class UserService {

    public static getUsers(): any {
        return prismaClient.user.findMany();
    }

    public static getUser(id: string): any {
        return prismaClient.user.findUnique({
            where: {
                id: id
            }
        })
    }

    public static async createUser(newUser: CreateUserPayload): Promise<any> {
        const { firstName, lastName, email, password } = newUser;

        const foundUser = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });

        if (Boolean(foundUser)) {
            throw new Error("User with this email already exists");
        }

        const salt = randomBytes(32).toString("hex");
        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");

        return await prismaClient.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
                salt,
                // role
            }
        });
    }

    public static async loginUser(payload: GetUserTokenPayload) {
        const { email, password } = payload;
        let user = await prismaClient.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        const hashedPassword = createHmac("sha256", user.salt)
            .update(password)
            .digest("hex");

        if (hashedPassword !== user.password) {
            throw new Error("Incorrect password");
        }

        let token = jsonwebtoken.sign({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            // role: user.role
        }, "process.env.JWT_SECRET", { expiresIn: "1h" });

        return token;
    }
}

export default UserService;