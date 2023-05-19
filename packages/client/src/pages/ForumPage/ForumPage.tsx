import React, { useState } from 'react'
import { CommentItem } from './components/CommentItem'
import { tempUserData } from '../../utils/constants'
import { Button } from '../../components/Button'
import { v4 as makeId } from 'uuid'

interface Comment {
    id: string
    date: number
    text: string
}

export const ForumPage = () => {

    const [ comments, setComments ] = useState<Comment[]>([])
    const [ commentText, setCommentText ] = useState('')

    const handleSendComment = () => {
        const comment = {
            id: makeId(),
            date: Date.now(),
            text: commentText
        }
        setComments([ ...comments, comment ])
        setCommentText('')
    }

    return (
        <main className="main__feed">
            <section className='content'>
                {comments.map((comment) => {
                    return <CommentItem
                        key={comment.id}
                        id={comment.id}
                        avatar={tempUserData.avatar}
                        login={tempUserData.login}
                        userId={tempUserData.id}
                        date={comment.date}
                        text={comment.text}
                    />
                })
                }
            </section>
            <footer className='footer'>
                <textarea
                    className='textarea__feed'
                    placeholder='Написать комментарий'
                    name='comment'
                    onBlur={(e) => setCommentText(e.target.value)}
                />
                {commentText && <Button buttonClass='button__feed' type='button' onClick={handleSendComment} text='Отправить' />}
            </footer>
        </main>
    )
}
