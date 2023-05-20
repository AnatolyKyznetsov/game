import React, { FormEvent, useRef, useState } from 'react'
import { Input } from '../components/Input'
import { INPUT_TOOLTIPS } from '../components/Input'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { validator } from '../utils/validator'
import { Paths } from '../utils/paths'
import { useAuthorization } from '../hooks/useAuthorization'
import { useAppDispatch } from '../store/hooks'
import { getUserInfo } from '../store/slices/userSlice/actions'

export function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { isAuth, signin } = useAuthorization();
    const [ errorFields, setErrorFields ] = useState({
        login: false,
        password: false
    })

    const onSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        const fieldsValidated = validateFields();
        if (fieldsValidated) {
            signin({
                login: (loginRef.current as HTMLInputElement).value,
                password: (passwordRef.current as HTMLInputElement).value
            }).then(() => {
                dispatch(getUserInfo());

                if (isAuth) {
                    navigate(Paths.main)
                }
            })
        }
    }

    const validateFields = (): boolean => {
        const newErrorFields = {
            login: !validator(loginRef.current?.value, 'login'),
            password: !validator(passwordRef.current?.value, 'password')
        }
        setErrorFields(newErrorFields);

        return !Object.values(newErrorFields).includes(true)
    }

    return (
        <main className='main'>
            <div className='shape'>
                <div className='shape__wrapper'>
                    <div className='title title_main shape__title shape__title_big'>
                        Вход
                    </div>
                    <form method='post' className='form' onSubmit={onSubmitForm}>
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
                        <Button type='submit' text='Войти' buttonClass='form__button'/>
                    </form>
                    <Link to={Paths.register} className='link shape__link'>Еще не зарегестрированы?</Link>
                </div>
            </div>
        </main>
    )
}
