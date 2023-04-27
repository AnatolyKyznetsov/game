import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Paths } from './utils/paths'
import { MainPage } from './pages/MainPage'
import { ErrorPage } from './pages/ErrorPage'
import React from 'react'
import { LeaderBoardPage } from './pages/LeaderBoardPage'

export const App = () => {
    const location = useLocation()
    return (
        <Routes location={location}>
            <Route path={Paths.register} element={<RegisterPage />} />
            <Route path={Paths.login} element={<LoginPage />} />
            <Route path={Paths.main} element={<MainPage />} />
            <Route path={Paths.notFound} element={<ErrorPage title="404" />} />
            <Route path={Paths.error} element={<ErrorPage title="500" />} />
            <Route path={Paths.leaderBoard} element={<LeaderBoardPage />} />
        </Routes>
    )
}
