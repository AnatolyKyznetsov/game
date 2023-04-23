import React from 'react'
import { ButtonProps } from '../interfaces'

export function Button(buttonProps: ButtonProps) {
    return (
        <button className={'button ' + buttonProps.buttonClass} type={buttonProps.type}>
            {buttonProps.text}
        </button>
    )
}
