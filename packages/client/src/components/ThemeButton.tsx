import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { postTheme } from '../store/slices/userSlice/actions';
import { useAuthorization } from '../hooks/useAuthorization';

export function ThemeButton() {
    const dispatch = useAppDispatch();
    const { isAuth } = useAuthorization()
    const isLightTheme = useAppSelector(state => state.user.isLightTheme);
    const [ lightTheme, setLightTheme ] = useState(isLightTheme);

    const changeTheme = () => {
        const result = !lightTheme

        setLightTheme(result);

        if (isAuth) {
            dispatch(postTheme(result));
        }

        localStorage.setItem('lightTheme', String(result ? true : ''));
    }

    useEffect(() => {
        if (!isAuth) {
            const lightTheme = Boolean(localStorage.getItem('lightTheme'));
            setLightTheme(lightTheme);
        } else {
            setLightTheme(isLightTheme);
            localStorage.setItem('lightTheme', String(lightTheme ? true : ''));
        }
    }, [])

    useEffect(() => {
        if (lightTheme) {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    }, [ lightTheme ])

    return (
        <button className='round-button round-button_top' onClick={changeTheme}>
            <img src={`/images/${ lightTheme ? 'sun' : 'moon' }.svg`} alt="Сменить тему." />
        </button>
    )
}
