import React from 'react'
import { getDateToLocale } from '../../../utils/getDateToLocale'
interface CommentItemProps {
    id: string
    login: string
    avatar: string
    text: string
    userId: number
    date: number
}

export const CommentItem = ({
    id,
    userId,
    login,
    avatar,
    text,
    date }: CommentItemProps) => {
         
    const formatedDate = getDateToLocale(date)
    return (
        <section className='comment'>
            <div className='avatar' />
            <div className='comment__wrapper'>
                <div className='comment__box'>
                    <span>{login}</span>
                    <span>{formatedDate}</span>
                </div>
                <p className='text__comment'>{text}</p>
            </div>
        </section>
    )
}
