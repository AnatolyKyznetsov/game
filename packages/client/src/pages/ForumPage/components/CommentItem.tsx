import React from 'react'
import { getDateToLocale } from '../../../utils/getDateToLocale'
import { useWindowSize } from '../../../utils/hooks/useWindowSize'
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
    const { width } = useWindowSize()
    const formattedDate = getDateToLocale(date)
    return (
        <section className='comment'>
            {width > 768 && <div className='avatar__message'>
                <img className='avatar__image' src={avatar} alt='Аватар' />
            </div>}
            <div className='comment__wrapper'>
                <div className='comment__box'>
                    <span>{login}</span>
                    <span>{formattedDate}</span>
                </div>
                <p className='text__comment'>{text}</p>
            </div>
        </section>
    )
}
