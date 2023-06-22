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
        navigate(Paths.startScreen)
    }

    useEffect(() => {
        const context = gsap.context(() => {
            gsap.to([ description.current, title.current ], {
                startAt: {
                    y: '80vh'
                },
                duration: 1,
                y: '-=78vh',
                onComplete: () => setIsActiveButton(true),
                repeat: 0,
                overwrite: true,
            })
        })

        return () => context.revert()
    }, [])

    return (
        <main className='main'>
            <img className="main__logo" src="/images/logo.png" alt="Логотип." />
            <p className='text__main' ref={description}>{gameDescription}</p>
            {isActiveButton && <Button
                onClick={handleStartButton}
                type='button'
                text='Начать'
                buttonClass='button__start' />}
        </main>
    )
}
