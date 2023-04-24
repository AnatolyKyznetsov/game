import React, { ChangeEvent, useState } from 'react'
import { InputProps } from '../interfaces'

export const INPUT_TOOLTIPS = {
    name: 'Первая буква должна быть заглавной, без пробелов и без цифр,допустим дефис',
    login: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, допустимы дефис и нижнее подчёркивание',
    phone: 'Без пробелов, состоит из цифр, может начинается с плюса',
    password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'
}

export function Input(inputProps: InputProps) {
    const [ labelClass, setLabelClass ] = useState('label');
    const [ inputClass, setInputClass ] = useState('label__input');
    const [ error, setError ] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value) {
            setInputClass('label__input not-empty');
        }
    }

    function hasTooltip() {
        if (inputProps.tooltip) {
            return (<span className='tooltip label__tooltip tooltip_left tooltip_bottom' data-text={inputProps.tooltip}></span>)
        }
    }

    return (
        <label className={labelClass}>
            <input type={inputProps.type} className={inputClass} name={inputProps.name} onChange={handleChange}/>
            <div className='label__line'></div>
            <span className='label__name'>{inputProps.label}</span>
            <p className='text label_message'>{error}</p>
            {hasTooltip()}
        </label>
    )
}
