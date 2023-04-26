import { RefObject } from 'react'

export interface InputProps {
    type: string,
    name: string,
    label: string
    tooltip: string,
    error?: boolean,
    ref?: RefObject<HTMLInputElement>
}

export interface ButtonProps {
    type: 'button' | 'submit' | 'reset',
    text: string,
    buttonClass: string
    onClick?: (e: Event) => void
}
