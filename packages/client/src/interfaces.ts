import { FormEvent } from 'react'

export interface InputProps {
    type: string,
    name: string,
    label: string
    tooltip: string,
    error?: boolean
}

export interface ButtonProps {
    type: 'button' | 'submit' | 'reset',
    text: string,
    buttonClass: string,
    onSubmit?: (e: FormEvent) => void
    onClick?: (e: FormEvent) => void
}
