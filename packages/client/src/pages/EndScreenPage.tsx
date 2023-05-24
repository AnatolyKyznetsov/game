import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../utils/paths'
import { Button } from '../components/Button'

interface EndScreenPageProps {
    title: string
    buttonText: string
    text?: string
}

export const EndScreenPage = ({ title, text, buttonText }: EndScreenPageProps) => {
    const titleRef = useRef(null)
    const [ isActiveButton, setIsActiveButton ] = useState(false)
    const navigate = useNavigate()

    const handleEndButton = () => {
        navigate(Paths.game)
    }

    useEffect(() => {
        const context = gsap.context(() => {
            gsap.to(titleRef.current, {
                startAt: {
                    y: '80vh'
                },
                duration: 1,
                y: '-=90vh',
                onComplete: () => setIsActiveButton(true),
                repeat: 0,
                overwrite: true,
            })
        })

        return () => context.revert()
    }, [])

    return (
        <main className='main'>
            <h1 className='title__main title_centered' ref={titleRef}>
                {title} <br /> {text ? text : ''}
            </h1>

            {isActiveButton && <Button
                onClick={handleEndButton}
                type='button'
                text={buttonText}
                buttonClass='button__start' />}
        </main>
    )
}
