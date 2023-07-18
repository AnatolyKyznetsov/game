import React, { useEffect, useState } from 'react'
import { Paths } from '../utils/paths'
import { Menu } from '../components/Menu'
import { FullscreenButton } from '../components/FullscreenButton'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { logoutUser } from '../store/slices/userSlice/actions'
import { useMobile } from '../hooks/useMobile'

export const StartPage = () => {
    const { isMobile, landscapeMode } = useMobile();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate(Paths.main)
    }

    const menuItems = [
        { title: 'Новая игра', url: Paths.game },
        { title: 'Форум', url: Paths.feed },
        { title: 'Профиль', url: Paths.profile },
        { title: 'Таблица лидеров', url: Paths.leaderBoard },
        { title: 'Выход', clickHandler: handleLogout }
    ]

    if (isMobile && !landscapeMode) {
        return (
            <main className='main'>
                <p className="text__main">
                    Перейдите в альбомный режим
                </p>
                <FullscreenButton />
            </main>
        )
    }

    return (
        <main className='main'>
            <img className="main__logo" src="/images/logo.png" alt="Логотип." />
            <Menu items={menuItems} />
            <FullscreenButton />
        </main>
    )
}
