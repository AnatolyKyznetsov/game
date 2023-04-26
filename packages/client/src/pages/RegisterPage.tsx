import React, { createRef, useState } from 'react'
import { Input } from '../components/Input'
import { INPUT_TOOLTIPS } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { Validator } from '../utils/Validator'

export function RegisterPage() {
    const navigator = useNavigate()
    const firstNameRef = createRef<HTMLInputElement>();
    const secondNameRef = createRef<HTMLInputElement>();
    const phoneRef = createRef<HTMLInputElement>();
    const loginRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const [ errorFields, setErrorFields ] = useState({
        login: false,
        password: false,
        phone: false,
        firstName: false,
        secondName: false
    })

    const handleClick = () => {
        if (!Object.values(validateFields()).includes(true)) {
            navigator('/')
        }
    }

    const validateFields = () => {
        const newErrorFields = {
            login: !Validator(loginRef.current?.value, 'login'),
            password: !Validator(passwordRef.current?.value, 'password'),
            phone: !Validator(phoneRef.current?.value, 'phone'),
            firstName: !Validator(firstNameRef.current?.value, 'first_name'),
            secondName: !Validator(secondNameRef.current?.value, 'second_name')
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
                        />
                        <Button type='submit' text='Зарегестрироваться'
                            buttonClass='form__button' onClick={handleClick}/>
                    </form>
                    <a href='/login' className='link shape__link'>Войти</a>
                </div>
            </div>
        </main>
    )
}
