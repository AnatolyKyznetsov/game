import React from 'react';
import { Input } from '../components/Input'
import { INPUT_TOOLTIPS } from '../components/Input'
import { Button } from '../components/Button'

export function LoginPage() {
    return (
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
                    />
                    <Input
                        type='password'
                        name='password'
                        label='Пароль'
                        tooltip={INPUT_TOOLTIPS.password}
                    />
                    <Button type='submit' text='Войти' buttonClass='form__button'/>
                </form>
                <a href='/register' className='link shape__link'>Еще не зарегестрированы?</a>
            </div>
        </div>
    )
}
