import { User } from "@/generated/prisma";
import { NextApiHandlerWithCookie } from "@/types";
import checkFields from "@/utils/checkFields";
import prisma from "@/utils/prisma";
import argon2 from "argon2";
import jwt from 'jsonwebtoken';

const loginHandler: NextApiHandlerWithCookie = async (req, res) => {
    const data: Pick<User, 'email' | 'password'> = JSON.parse(req.body)

    if(!checkFields(data, ['email', 'password'])) {
        return res.status(400).json({ message: 'Required field missing'})
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            },
            select: {
                id: true,
                email: true,
                password: true,
                username: true,
                avatarUrl: true
            }
        })

        if(!user) return res.status(404).json({ message: "User not found"} );

        const isPasswordCorrect = await argon2.verify(user.password, data.password);

        if(!isPasswordCorrect) return res.status(403).json({ message: "Incorrect credentials"});

        const idToken = jwt.sign(
            { userId: user.id },
            process.env.ID_TOKEN_SECRET,
            {
                expiresIn: '7d'
            }
        )
        
        const accessToken = jwt.sign(
            {userId: user.id},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d'
            }
        )

        res.cookie({
            name: process.env.COOKIE_NAME,
            value: idToken,
            options: {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: '/',
                sameSite: true,
                secure: true
            }
        })

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                avatarUrl: user.avatarUrl
            },
            accessToken
        })
    } catch(e) {
        console.log(e) 
        res.status(500).json({ messaFge: "User login error" })
    }
}