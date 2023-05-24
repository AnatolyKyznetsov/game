import React from 'react'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Paths } from './utils/paths'
import { MainPage } from './pages/MainPage'
import { ErrorPage } from './pages/ErrorPage'
import { LeaderBoardPage } from './pages/LeaderBoardPage'
import { GamePage } from './pages/GamePage'
import { StartPage } from './pages/StartPage'
import { ForumPage } from './pages/ForumPage/ForumPage'
import { EndScreenPage } from './pages/EndScreenPage'
import { ProfilePage } from './pages/ProfilePage'
import { EditProfilePage } from './pages/EditProfilePage'
import { EditPasswordPage } from './pages/EditPasswordPage'
import { RequiredAuth } from './components/RequiredAuth';

export const App = () => {
    const location = useLocation()
    return (
        <Routes location={location}>
            <Route path={Paths.register} element={<RegisterPage />} />
            <Route path={Paths.login} element={<LoginPage />} />
            <Route path={Paths.endScreenSuccess} element={
                <RequiredAuth>
                    <EndScreenPage title="Поздравляем!" text="Ваше время 05:12" buttonText="Далее" />
                </RequiredAuth>
            }/>
            <Route path={Paths.endScreenFail} element={
                <RequiredAuth>
                    <EndScreenPage title="Game over" buttonText="Начать с начала" />
                </RequiredAuth>
            }/>
            <Route path={Paths.feed} element={
                <RequiredAuth>
                    <ForumPage />
                </RequiredAuth>
            }/>
            <Route path={Paths.main} element={<MainPage />} />
            <Route path={Paths.game} element={
                <RequiredAuth>
                    <GamePage />
                </RequiredAuth>
            }/>
            <Route path={Paths.startScreen} element={
                <RequiredAuth>
                    <StartPage />
                </RequiredAuth>
            }/>
            <Route path={Paths.profile} element={
                <RequiredAuth>
                    <ProfilePage />
                </RequiredAuth>
            }/>
            <Route path={Paths.editProfile} element={
                <RequiredAuth>
                    <EditProfilePage />
                </RequiredAuth>
            }/>
            <Route path={Paths.editPassword} element={
                <RequiredAuth>
                    <EditPasswordPage />
                </RequiredAuth>
            }/>
            <Route path={Paths.notFound} element={<ErrorPage title="404" text="Не туда попали." />} />
            <Route path={Paths.error} element={<ErrorPage title="500" text="Ошибка сервера, мы уже фиксим." />} />
            <Route path={Paths.leaderBoard} element={
                <RequiredAuth>
                    <LeaderBoardPage />
                </RequiredAuth>
            }/>
        </Routes>
    )
}
