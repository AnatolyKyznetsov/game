import { FormEvent } from 'react'
import { Player } from './engine/Player'

export interface InputProps {
    type: string,
    name: string,
    label: string
    tooltip?: string,
    error?: boolean
}

export interface ButtonProps {
    type: 'button' | 'submit' | 'reset',
    text: string,
    buttonClass: string,
    onClick?: (e: FormEvent) => void
}

export interface MenuItemProps {
    id?: string,
    title: string,
    url?: string,
    isActive?: boolean,
    index?: number,
    clickHandler?: () => void,
    mouseEnterHandler?: (e: React.MouseEvent) => void,
}

export interface MenuProps {
    items: MenuItemProps[]
}

export interface PlayersStatusProps {
    players: Player[],
    stopTimer: boolean
}

export interface PlayersStatusItemProps {
    player: Player,
}

export interface SigninData {
    login: string,
    password:string
}
