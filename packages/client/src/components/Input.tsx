import React, { ForwardedRef, forwardRef, RefObject, useEffect, useState } from 'react'
import { InputProps } from '../interfaces'
import { validator } from '../utils/validator'

export const INPUT_TOOLTIPS = {
    name: 'Первая буква должна быть заглавной, без пробелов и без цифр,допустим дефис',
    login: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, допустимы дефис и нижнее подчёркивание',
    phone: 'Без пробелов, состоит из цифр, может начинается с плюса',
    password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    email: 'Почта может включать цифры и буквы'
}

export const Input = forwardRef((inputProps: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [ inputClass, setInputClass ] = useState('label__input');
    const [ error, setError ] = useState(inputProps.error);

    useEffect(() => {
        setError(inputProps.error)

        return () => {
            setError(false)
        }
    }, [ inputProps.error ]);

    const handleChange = () => {
        const value = (ref as RefObject<HTMLInputElement>).current?.value;
        if (value) {
            setInputClass('label__input not-empty');
        }
        removeError();
    }

    const handleBlur = () => {
        if (inputProps.name === 'passwordRepeat') {
            return
        }

        const validation = validator((ref as RefObject<HTMLInputElement>).current?.value, inputProps.name);
        if (!validation) {
            setError(true);
        }
    }

    const removeError = () => {
        if (error) {
            setError(false);
        }
    }

    const hasTooltip = () => {
        if (inputProps.tooltip) {
            return (<span className='tooltip label__tooltip tooltip_left tooltip_bottom' data-text={inputProps.tooltip}></span>)
        }
    }

    const labelClass = error ? 'label error' : 'label';
    return (
        <label className={labelClass}>
            <input type={inputProps.type} className={inputClass} name={inputProps.name}
                onChange={handleChange} onBlur={handleBlur} onFocus={removeError}
                ref={ref}/>
            <div className='label__line'></div>
            <span className='label__name'>{inputProps.label}</span>
            <p className='text label__message'>{error ? (inputProps.name === 'passwordRepeat' ? 'Пароли должны совпадать' : 'Неверно заполнено поле') : ''}</p>
            {hasTooltip()}
        </label>
    )
})
