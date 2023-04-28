import React from 'react'
import { Paths } from '../utils/paths'
import { MenuItemProps } from '../interfaces'
import { Menu } from '../components/Menu'

export const StartPage = () => {
    const menuItems: MenuItemProps[] = [
        { title: 'Новая игра', url: Paths.game },
        { title: 'Форум', url: Paths.feed },
        { title: 'Профиль', url: Paths.profile },
        { title: 'Выход', url: Paths.login }
    ]

    return (
        <main className='main'>
            <img className="main__logo" src="/images/logo.png" alt="" />
            <Menu items={menuItems} />
        </main>
    )
}
