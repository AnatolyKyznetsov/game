import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Paths } from '../utils/paths'
import { gsap } from 'gsap'
import { gameDescription } from '../utils/constants'

export const MainPage = () => {
    const description = useRef(null)
    const title = useRef(null)
    const [ isActiveButton, setIsActiveButton ] = useState(false)
    const navigate = useNavigate()

    const handleStartButton = () => {
        navigate(Paths.register)
    }

    useEffect(() => {
        const context = gsap.context(() => {
            gsap.to([ description.current, title.current ], {
                startAt: {
                    y: '80vh'
                },
                duration: 7,
                ease: 'none',
                y: '-=150vh',
                onRepeat: () => setIsActiveButton(true),
                repeat: -1,
                overwrite: true,
            })
        })

        return () => context.revert()
    }, [])

    return (
        <main className='main'>
            <h1 className='title__main' ref={title}>The Lost Vikings</h1>
            <p className='text__main' ref={description}>{gameDescription}</p>
            {isActiveButton && <Button
                onClick={handleStartButton}
                type='button'
                text='Начать'
                buttonClass='button__start' />}
        </main>
    )
}

/* newline */
