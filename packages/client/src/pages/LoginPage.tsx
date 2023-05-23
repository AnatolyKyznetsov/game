import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Input } from '../components/Input'
import { INPUT_TOOLTIPS } from '../components/Input'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { validator } from '../utils/validator'
import { Paths } from '../utils/paths'
import { useAuthorization } from '../hooks/useAuthorization'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getUserInfo } from '../store/slices/userSlice/actions'

export function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const error = useAppSelector(state => state.user.error);
    const [ errorMessage, setErrorMessage ] = useState('');
    const { isAuth, signin } = useAuthorization();
    const [ errorFields, setErrorFields ] = useState({
        login: false,
        password: false
    })

    useEffect(() => {
        if (isAuth) {
            navigate(Paths.startScreen)
        }

        if (error && !errorMessage && !Object.values(getErrorFields()).includes(true)) {
            setErrorMessage(error)
        } else {
            setErrorMessage('');
        }
    }, [ error, isAuth, errorFields ])

    const onSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        const errorFields = getErrorFields();
        setErrorFields(errorFields);

        const fieldsValidated = !Object.values(errorFields).includes(true);
        if (fieldsValidated) {
            signin({
                login: loginRef.current?.value as string,
                password: passwordRef.current?.value as string
            }).then(() => {
                dispatch(getUserInfo());
            })
        }
    }

    const getErrorFields = () => {
        return {
            login: !validator(loginRef.current?.value, 'login'),
            password: !validator(passwordRef.current?.value, 'password')
        }
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
                    <p className='text error label__error'>{errorMessage}</p>
                    <Link to={Paths.register} className='link shape__link'>Еще не зарегестрированы?</Link>
                </div>
            </div>
        </main>
    )
}
