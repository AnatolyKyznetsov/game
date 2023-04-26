import React, { ChangeEvent, ForwardedRef, forwardRef, useState } from 'react'
import { InputProps } from '../interfaces'
import { Validator } from '../utils/Validator'

export const INPUT_TOOLTIPS = {
    name: 'Первая буква должна быть заглавной, без пробелов и без цифр,допустим дефис',
    login: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, допустимы дефис и нижнее подчёркивание',
    phone: 'Без пробелов, состоит из цифр, может начинается с плюса',
    password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'
}

export const Input = forwardRef((inputProps: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [ value, setValue ] = useState('');
    const [ inputClass, setInputClass ] = useState('label__input');
    const [ error, setError ] = useState(inputProps.error);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value) {
            setInputClass('label__input not-empty');
            setValue(value);
        }
    }

    const handleBlur = () => {
        const validation = Validator(value, inputProps.name);
        if (!validation && inputProps.tooltip) {
            setError(true);
        }
    }

    const handleFocus = () => {
        if (error) {
            setError(false);
        }
    }

    function hasTooltip() {
        if (inputProps.tooltip) {
            return (<span className='tooltip label__tooltip tooltip_left tooltip_bottom' data-text={inputProps.tooltip}></span>)
        }
    }

    const labelClass = error ? 'label error' : 'label'
    return (
        <label className={labelClass}>
            <input type={inputProps.type} className={inputClass} name={inputProps.name}
                onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}
                ref={ref}/>
            <div className='label__line'></div>
            <span className='label__name'>{inputProps.label}</span>
            <p className='text label__message'>{error ? 'Неверно заполнено поле' : ''}</p>
            {hasTooltip()}
        </label>
    )
})
