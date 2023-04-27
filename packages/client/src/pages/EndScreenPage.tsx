import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../utils/paths'
import { Button } from '../components/Button'

export const EndScreenPage = () => {
    const title = useRef(null)
    const [ isActiveButton, setIsActiveButton ] = useState(false)
    const navigate = useNavigate()

    const handleEndButton = () => {
        navigate(Paths.main)
    }
    useEffect(() => {
        const context = gsap.context(() => {
            gsap.to(title.current, {
                startAt: {
                    y: '80vh'
                },
                duration: 7,
                ease: 'elastic',
                y: '-=90vh',
                onRepeat: () => setIsActiveButton(true),
                repeat: 0,
                overwrite: true,
            })
        })

        return () => context.revert()
    }, [])

    return (
        <main className='main' >
            <h1 ref={title}>The End</h1>
            {isActiveButton && <Button
                onClick={handleEndButton}
                type='button'
                text='Начать с начала'
                buttonClass='button__start' />}
        </main>
    )
}
