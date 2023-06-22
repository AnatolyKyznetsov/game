import React, { JSX } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { RequiredAuth } from './components/RequiredAuth';
import { routes } from './utils/routes';
import { ThemeButton } from './components/ThemeButton';

export const App = () => {
    const location = useLocation()

    const makeProtected = (element: JSX.Element) => {
        return <RequiredAuth>{element}</RequiredAuth>
    }

    const addThemeBtn = (element: JSX.Element) => {
        return <>{element} <ThemeButton /> </>
    }

    return (
        <Routes location={location}>
            {routes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.protected ?
                        makeProtected( addThemeBtn(route.element) ) :
                        addThemeBtn(route.element)}
                />
            ))}
        </Routes>
    )
}
