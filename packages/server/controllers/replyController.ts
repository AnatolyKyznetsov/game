import { Request, Response } from 'express'
import { ReplyService } from '../services/ReplyService'

export const createReply = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            text,
            userId,
            topicId,
            commentId,
        }: {
            text: string
            userId: number
            topicId: number
            commentId: number
        } = req.body.data
        const comment = await ReplyService.create(
            text,
            userId,
            topicId,
            commentId
        )
        res.status(201).send(comment)
    } catch (error) {
        console.error('Error creating comment:', error)
        res.status(500).json({ error: 'Failed to create comment' })
    }
}
