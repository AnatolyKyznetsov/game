import React, { ChangeEvent, useState } from 'react'
import { CommentItem } from './components/CommentItem'
import { tempUserData } from '../../utils/constants'
import { Button } from '../../components/Button'
import { v4 as makeId } from 'uuid'
import { useScroll } from '../../hooks/useScroll'
interface Comment {
    id: string
    date: number
    text: string
}

export const ForumPage = () => {

    const [ comments, setComments ] = useState<Comment[]>([])
    const [ commentText, setCommentText ] = useState('')
    const [ isVisibleButton, setIsVisibleButton ] = useState(false)
    const ref = useScroll([ comments ])
    const handleSendMessage = () => {
        setIsVisibleButton(false)
        setComments([ ...comments, { id: makeId(), date: Date.now(), text: commentText } ])
        setCommentText('')
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!event.shiftKey && !event.ctrlKey && event.key === 'Enter') {
            event.preventDefault()
            handleSendMessage()
        }
        if (event.metaKey && event.key === 'Enter') {
            event.preventDefault()
            handleSendMessage()
        }
    }
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setIsVisibleButton(true)
        setCommentText(e.target.value)
        if (!e.target.value.replace('\n', '')) {
            setIsVisibleButton(false)
            setCommentText('')
        }
    }
    return (
        <main className="main__feed">
            <section className='content' ref={ref}>
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
                    value={commentText}
                    className='textarea__feed'
                    placeholder='Написать комментарий'
                    name='comment'
                    autoFocus
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                />
                {isVisibleButton && <Button buttonClass='button__feed' type='button' onClick={handleSendMessage} text='Отправить' />}
            </footer>
        </main>
    )
}
