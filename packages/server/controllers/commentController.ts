import { Request, Response } from 'express'
import { CommentService } from '../services/CommentService'

export const createComment = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            text,
            userId,
            topicId,
            replyId,
        }: { text: string; userId: number; topicId: number; replyId: number } =
            req.body.data
        const comment = await CommentService.createComment(
            text,
            userId,
            topicId,
            replyId
        )
        res.status(201).send(comment)
    } catch (error) {
        console.error('Error creating comment:', error)
        res.status(500).json({ error: 'Failed to create comment' })
    }
}

export const getCommentsByTopic = async (req: Request, res: Response) => {
    try {
        const { topicId } = req.params
        const comments = await CommentService.getCommentsByTopic(
            Number(topicId)
        )
        res.status(200).json(comments)
    } catch (error) {
        console.error('Error getting comments:', error)
        res.status(500).json({ error: 'Failed to get comments' })
    }
}

export const getRepliesByComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params
        const replies = await CommentService.getRepliesByComment(
            Number(commentId)
        )
        res.status(200).json(replies)
    } catch (error) {
        console.error('Error getting replies:', error)
        res.status(500).json({ error: 'Failed to get replies' })
    }
}
