import React, { FormEvent, useRef, useState } from 'react'
import { Input } from '../components/Input'
import { INPUT_TOOLTIPS } from '../components/Input'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { validator } from '../utils/validator'

export function LoginPage() {
    const navigator = useNavigate();
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [ errorFields, setErrorFields ] = useState({
        login: false,
        password: false
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
            password: !validator(passwordRef.current?.value, 'password')
        }
        setErrorFields(newErrorFields);

        return newErrorFields
    }

    return (
        <main className='main'>
            <div className='shape'>
                <div className='shape__wrapper'>
                    <div className='title title_main shape__title shape__title_big'>
                        Вход
                    </div>
                    <form method='post' className='form'>
                        <Input
                            type='text'
                            name='login'
                            label='Логин'
                            tooltip={INPUT_TOOLTIPS.login}
                            ref={loginRef}
                            error={errorFields.login}
                        />
                        <Input
                            type='password'
                            name='password'
                            label='Пароль'
                            tooltip={INPUT_TOOLTIPS.password}
                            ref={passwordRef}
                            error={errorFields.password}
                        />
                        <Button type='submit' text='Войти' buttonClass='form__button'
                            onSubmit={handleClick}/>
                    </form>
                    <Link to='/register' className='link shape__link'>Еще не зарегестрированы?</Link>
                </div>
            </div>
        </main>
    )
}
