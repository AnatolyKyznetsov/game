import React from 'react'
import { ButtonProps } from '../interfaces'

export function Button({ buttonClass, type, onClick, onSubmit, text }: ButtonProps) {
    return (
        <button className={'button ' + buttonClass} type={type} onClick={onClick} onSubmit={onSubmit}>
            {text}
        </button>
    )
}
