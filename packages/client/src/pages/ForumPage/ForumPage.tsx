import React, { ChangeEvent, useState } from 'react'
import { TopicItem } from './components/TopicItem'
import { tempForumTopics, tempUserData } from '../../utils/constants'
import { Button } from '../../components/Button'
import { v4 as makeId } from 'uuid'
import { useScroll } from '../../hooks/useScroll'
interface Topic {
    id: string
    date: number
    text: string
}

export const ForumPage = () => {

    const [ topics, setTopics ] = useState<Topic[]>(tempForumTopics)
    const [ topicText, setTopicText ] = useState('')
    const [ isVisibleButton, setIsVisibleButton ] = useState(false)
    const ref = useScroll([ topics ])
    const handleSendMessage = () => {
        setIsVisibleButton(false)
        setTopics([ ...topics, { id: makeId(), date: Date.now(), text: topicText } ])
        setTopicText('')
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
        setTopicText(e.target.value)
        if (!e.target.value.replace('\n', '')) {
            setIsVisibleButton(false)
            setTopicText('')
        }
    }
    return (
        <main className="main__feed">
            <section className='content' ref={ref}>
                {topics.map((topic) => {
                    return <TopicItem
                        key={topic.id}
                        id={topic.id}
                        avatar={tempUserData.avatar}
                        login={tempUserData.login}
                        userId={tempUserData.id}
                        date={topic.date}
                        text={topic.text}
                    />
                })
                }
            </section>
            <footer className='footer'>
                <textarea
                    value={topicText}
                    className='textarea__feed'
                    placeholder='Добавить новый топик'
                    name='topic'
                    autoFocus
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                />
                {isVisibleButton && <Button buttonClass='button__feed' type='button' onClick={handleSendMessage} text='Отправить' />}
            </footer>
        </main>
    )
}
