import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "../validations/authValidation.js";
import bcrypt from 'bcryptjs';
import prisma from "../DB/db.config.js";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";

class AuthController {
    static async register(req, res) {
        const body = req.body;

        try {
            const validator = vine.compile(registerSchema);
            const payload = await validator.validate(body);

            // Encrypt Password
            const salt = bcrypt.genSaltSync(10);
            payload.password = bcrypt.hashSync(payload.password, salt);

            const user = await prisma.user.create({
                data: payload
            });

            return res.status(200).json({ data: user, messages: "user created" });
            
        } catch(err) {
            console.log(err);
            if(err instanceof errors.E_VALIDATION_ERROR) {
                return res.status(400).json({ errors: err.messages });
            }
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code === 'P2002') {
                    return res.status(400).json({ errors: 'There is a unique constraint violation' });
                }
            }

        }
    }


    static async login(req, res) {
        const body = req.body;
        const { email, password } = body;

        const findUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(!findUser) {
            return res.status(400).json({ errors: "No User found with give email"});
        }

        if(!bcrypt.compareSync(password, findUser.password)) {
            return res.status(400).json({ errors: "Invalid password"});
        }

        const payload = {
            id: findUser.id,
            email: findUser.email,
            profile: findUser.profile,
            name: findUser.name,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "365d"
        });

        return res.status(200).json({ errors: "Login success", auth_token: `Bearer ${token}`});
    }
}

export default AuthController