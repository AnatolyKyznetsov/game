import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Paths } from '../utils/paths'
import { gsap } from 'gsap'
import { gameDescription } from '../utils/constants'
import { request } from '../utils/request';
import { Urls } from '../utils/api';
import { redirectUri } from '../utils/authorizationConstants';
import { getUserInfo } from '../store/slices/userSlice/actions';
import { useAppDispatch } from '../store/hooks';

export const MainPage = () => {
    const description = useRef(null)
    const title = useRef(null)
    const [ isActiveButton, setIsActiveButton ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const handleStartButton = () => {
        navigate(Paths.startScreen)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            request(`${Urls.baseUrl}${Urls.oAuth}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'code': code,
                    'redirect_uri': redirectUri
                })
            }).then(res => {
                if (res.ok) {
                    dispatch(getUserInfo()).then(res => {
                        if (res.payload !== undefined) {
                            navigate(Paths.game);
                        }
                    })
                }
            })
        }

        const context = gsap.context(() => {
            gsap.to([ description.current, title.current ], {
                startAt: {
                    y: '80vh'
                },
                duration: 1,
                y: '-=75vh',
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
