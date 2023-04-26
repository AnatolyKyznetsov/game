import React, { createRef, FormEvent, useState } from 'react'
import { Input } from '../components/Input'
import { INPUT_TOOLTIPS } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { Validator } from '../utils/Validator'

export function LoginPage() {
    const navigator = useNavigate();
    const loginRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
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
            login: !Validator(loginRef.current?.value, 'login'),
            password: !Validator(passwordRef.current?.value, 'password')
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
                            onClick={handleClick}/>
                    </form>
                    <a href='/register' className='link shape__link'>Еще не зарегестрированы?</a>
                </div>
            </div>
        </main>
    )
}
