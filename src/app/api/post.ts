import { NextApiRequestWithUserId } from "@/types"
import { NextApiResponse } from "next";
import { Post } from "@/generated/prisma";
import nc from 'next-connect';
import checkFields from "@/utils/checkFields";
import prisma from "@/utils/prisma";

const postsHandler = nc<NextApiRequestWithUserId, NextApiResponse>();

postsHandler.post(async (req, res) => {
    const data: Pick<Post, 'title' | 'content' | 'authorId'> = JSON.parse(req.body);

    if (!checkFields(data, ['title', 'content'])) {
        res.status(400).json({message: "Required field is missing"})
    }

    data.authorId = req.userId;

    try {
        const post = await prisma.post.create({
            data
        })
        res.status(200).json(post);
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "Post create error"})
    };
});

postsHandler.put(async (req, res) => {
    const data: Pick<Post, 'title' | 'content'> & {
        postId: string
    } = JSON.parse(req.body);

    if(!checkFields(data, ['title', 'content'])) {
        res.status(400).json({ message: "Required field missing" });
    }

    try {
        const post = prisma.post.update({
            where: { authorId: { id: data.postId, authorId: req.userId }},
            data: {
                title: data.title,
                content: data.content
            }
        })
        res.status(200).json(post)
    } catch(e) {
        console.error(e);
        res.status(500).json({ message: "Post update error" })
    }

})

postsHandler.delete(async (req, res) => {
    const id = req.query.id as string;

    if(!id) res.status(400).json({ message: "Post ID is missing"})

    try {
        const post = prisma.post.delete({
            where: { authorId: { id, authorId: req.userId }}
        })
        res.status(200).json(post)
    } catch(e) {
        console.error(e);
        res.status(500).json({ message: "Post delete error" })
    }
})