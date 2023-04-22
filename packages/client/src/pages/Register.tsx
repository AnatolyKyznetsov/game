import React, { Component } from 'react';
import Input from '../components/Input'
import { INPUT_TOOLTIPS } from '../components/tooltips'
import Button from '../components/Button'

class Register extends Component {
    render() {
        return (
            <div className='shape'>
                <div className='shape__wrapper'>
                    <div className='title title_main shape__title shape__title_big'>
                        Регистрация
                    </div>
                    <Input
                        type='text'
                        name='first_name'
                        label='Имя'
                        tooltip={INPUT_TOOLTIPS.name}
                    />
                    <Input
                        type='text'
                        name='second_name'
                        label='Фамилия'
                        tooltip={INPUT_TOOLTIPS.name}
                    />
                    <Input
                        type='text'
                        name='login'
                        label='Логин'
                        tooltip={INPUT_TOOLTIPS.login}
                    />
                    <Input
                        type='text'
                        name='email'
                        label='Почта'
                        tooltip=''
                    />
                    <Input
                        type='text'
                        name='first_name'
                        label='Имя'
                        tooltip={INPUT_TOOLTIPS.name}
                    />
                    <Input
                        type='text'
                        name='phone'
                        label='Телефон'
                        tooltip={INPUT_TOOLTIPS.phone}
                    />
                    <Input
                        type='password'
                        name='password'
                        label='Пароль'
                        tooltip={INPUT_TOOLTIPS.password}
                    />
                    <Input
                        type='password'
                        name='password'
                        label='Пароль еще раз'
                        tooltip=''
                    />
                    <Button type='submit' text='Зарегестрироваться' buttonClass='button form__button'/>
                    <a href='/' className='link shape__link'>Войти</a>
                </div>
            </div>
        )
    }
}

export default Register;
