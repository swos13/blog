import { User } from "@/generated/prisma";
import { NextApiHandlerWithCookie } from "@/types";
import checkFields from "@/utils/checkFields";
import cookies from "@/utils/cookie";
import prisma from "@/utils/prisma";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const registerHandler: NextApiHandlerWithCookie = async (req, res) => {
  // extracting data from the request body
  // one of the advantages of using Prisma is the automatic generation of model types

  const data: Pick<User, "username" | "email" | "password"> = JSON.parse(req.body);

  //check required fields
  if (!checkFields(data, ["email", "password"])) {
    return res.status(400).json({ message: "Required field missing!" });
  }

  try {
    //retrieving user data
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
    })

    //if data exist user is already registered
    if(existingUser) {
        return res.status(409).json({ message: 'Email already in use' })
    }

    //hashing the password
    const passwordHash = await argon2.hash(data.password)
    data.password = passwordHash

    //save the user to db without the password
    const newUser = await prisma.user.create({
        data,
        select: {
            id: true,
            username: true,
            email: true,
        }
    })

    //generate ID token based on user's ID
    const idToken = await jwt.sign(
        {userId: newUser.id },
        process.env.ID_TOKEN_SECRET,
        {
            expiresIn: '7d',
        }
    )

    //generate access token based on user's ID
    const accessToken = await jwt.sign(
        {userId: newUser.id},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1d'
        }
    )

    //store id token in the cookie
    res.cookie({
        name: process.env.COOKIE_NAME,
        value: idToken,options: {
        httpOnly: true,
        // must match expiresIn value of the token
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // cookie applies to the whole application
        path: '/',
        // client and server share the same origin
        sameSite: true,
        secure: true
      }
    })

    //return the user data and the token

    res.status(200).json({
        user: newUser,
        accessToken
    })
  } catch(e) {
    console.log(e);
    res.status(500).json({ message: "User registration error"})
  }
};

export default cookies(registerHandler);
