import { prisma } from '../config/db.js'
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';


const register = async (req, res) => {
    const { name, email, password } = req.body;

    // when we register a user , we need to do a following process:

    // Check if user alredy exists
    const userExists = await prisma.user.findUnique({
        where: { email: email }
    });

    if (userExists) {
        return res.
            status(400)
            .json({ error: "User alredy exits with this email" })
    };

    // Hash Password : we will not put the password as the same as its, we will hash it, becuase put it
    // like its , not secure. 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // add user to our table

    // Create user
    const user = await prisma.user.create({
        data: {
            name, email, password: hashedPassword
        }
    });

    // Generate JWT Token
    const token = generateToken(user.id,res);

    res.status(201).json({
        status: "success",
        data: {
            id: user.id,
            name: name,
            email: email,
        },
        token,
    });

};

const login = async (req, res) => {
    const { email, password } = req.body;
    // Check if user email exists in the table
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.
            status(401)
            .json({ error: "Invaild email or password" })
    };

    // verify password
    const isPasswordVaild = await bcrypt.compare(password, user.password);

    if (!isPasswordVaild) {
        return res.
            status(401)
            .json({ error: "Invaild email or password" })
    };

    // Generate JWT Token
    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            id: user.id,
            email: email,
        },
        token,
    });
};


const logout = async (req,res) => {
    res.cookie("jwt","", {
        httpOnly : true,
        expires : new Date(0),
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfuly",
    });
};

export { register, login, logout  };