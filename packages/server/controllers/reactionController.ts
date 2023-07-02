import { Request, Response } from 'express'
import { ReactionService } from '../services/ReactionService'

export const createReaction = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { type, userId, commentId } = req.body
        const reaction = await ReactionService.create(type, userId, commentId)
        res.status(201).json(reaction)
    } catch (error) {
        console.error('Error creating reaction:', error)
        res.status(500).json({ error: 'Failed to create reaction' })
    }
}
