import prisma from "../DB/db.config.js";


export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(userExist) {
        return res.json({
            status: 400,
            message: "User already exist"
        })
    }

    const newUser = await prisma.user.create({
        data: {
            name, email, password
        }
    });
    
    return res.json({
        status: 200,
        message: "User created"
    })
};

export const getUser = async (req, res) => {
    const { user } = req;

    const findUser = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    });

    if(!findUser) {    
        return res.send({
            status: 400,
            data: {
                user
            },
            message: "user not found"
        }); 
    }
    
    return res.send({
        status: 200,
        data: {
            user: findUser
        },
        message: "user found"
    });
}