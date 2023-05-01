import React from 'react'
import { Paths } from '../utils/paths'
import { Menu } from '../components/Menu'
import { v4 as makeId } from 'uuid'

export const StartPage = () => {
    const menuItems = [
        { title: 'Новая игра', url: Paths.game },
        { title: 'Форум', url: Paths.feed },
        { title: 'Профиль', url: Paths.profile },
        { title: 'Выход', url: Paths.login }
    ].map(item => {
        return { ...item, id: makeId() }
    });

    return (
        <main className='main'>
            <img className="main__logo" src="/images/logo.png" alt="Логотип." />
            <Menu items={menuItems} />
        </main>
    )
}
