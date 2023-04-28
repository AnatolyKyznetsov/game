import React, { FormEvent, useRef, useState } from 'react'
import { Input } from '../components/Input'
import { INPUT_TOOLTIPS } from '../components/Input'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { validator } from '../utils/validator'

export function RegisterPage() {
    const navigator = useNavigate()
    const firstNameRef = useRef<HTMLInputElement>(null);
    const secondNameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordAgainRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [ errorFields, setErrorFields ] = useState({
        login: false,
        password: false,
        phone: false,
        firstName: false,
        secondName: false
    })

    const handleClick = (e: FormEvent) => {
        e.preventDefault();
        if (!Object.values(validateFields()).includes(true)) {
            navigator('/')
        }
    }

    const validateFields = () => {
        const newErrorFields = {
            login: !validator(loginRef.current?.value, 'login'),
            password: !validator(passwordRef.current?.value, 'password', passwordAgainRef.current?.value),
            phone: !validator(phoneRef.current?.value, 'phone'),
            firstName: !validator(firstNameRef.current?.value, 'first_name'),
            secondName: !validator(secondNameRef.current?.value, 'second_name')
        }
        setErrorFields(newErrorFields);

        return newErrorFields
    }

    return (
        <main className='main'>
            <div className='shape'>
                <div className='shape__wrapper'>
                    <div className='title title_main shape__title shape__title_big'>
                        Регистрация
                    </div>
                    <form method='post' className='form'>
                        <Input
                            type='text'
                            name='first_name'
                            label='Имя'
                            tooltip={INPUT_TOOLTIPS.name}
                            ref={firstNameRef}
                            error={errorFields.firstName}
                        />
                        <Input
                            type='text'
                            name='second_name'
                            label='Фамилия'
                            tooltip={INPUT_TOOLTIPS.name}
                            ref={secondNameRef}
                            error={errorFields.secondName}
                        />
                        <Input
                            type='text'
                            name='login'
                            label='Логин'
                            tooltip={INPUT_TOOLTIPS.login}
                            ref={loginRef}
                            error={errorFields.login}
                        />
                        <Input
                            type='text'
                            name='email'
                            label='Почта'
                            tooltip=''
                            ref={emailRef}
                        />
                        <Input
                            type='text'
                            name='phone'
                            label='Телефон'
                            tooltip={INPUT_TOOLTIPS.phone}
                            ref={phoneRef}
                            error={errorFields.phone}
                        />
                        <Input
                            type='password'
                            name='password'
                            label='Пароль'
                            tooltip={INPUT_TOOLTIPS.password}
                            ref={passwordRef}
                            error={errorFields.password}
                        />
                        <Input
                            type='password'
                            name='password'
                            label='Пароль еще раз'
                            tooltip=''
                            ref={passwordAgainRef}
                        />
                        <Button type='submit' text='Зарегестрироваться'
                            buttonClass='form__button' onSubmit={handleClick}/>
                    </form>
                    <Link to='/login' className='link shape__link'>Войти</Link>
                </div>
            </div>
        </main>
    )
}
