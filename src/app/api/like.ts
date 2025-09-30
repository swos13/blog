import { Like } from '@/generated/prisma';
import { NextApiRequestWithUserId } from '@/types';
import authGuard from '@/utils/authGuard';
import checkFields from '@/utils/checkFields';
import prisma from '@/utils/prisma';
import { NextApiResponse } from 'next';
import nc from 'next-connect';

const likeHandler = nc<NextApiRequestWithUserId, NextApiResponse>();


likeHandler.post(async (req, res) => {
    const data = JSON.parse(req.body) as Pick<Like, 'postId'>

    if(!checkFields(data, ['postId'])) return res.status(400).json({ message: "Required field missing"});

    try {
        //make sure it's correct post and user
        const like = await prisma.like.create({
            data: {
                postId: data.postId,
                userId: req.userId
            }
        })
        res.status(201).json(like)
    } catch(e) {
        console.error(e)
        res.status(500).json({ message: "Like creation error"})
    }
})

likeHandler.delete(async (req, res) => {
    const { likeId, postId } = req.query as Record<string, string>

    if (!likeId || !postId) return res.status(400).json({ message: 'Required field missing' })

    try {
        const like = await prisma.like.delete({
            where: {
                id_userId_postId: {
                    id: likeId,
                    userId: req.userId,
                    postId
                }
            }
        })
        res.status(200).json(like)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "Like deletion error"} )
    }
})

export default authGuard(likeHandler);