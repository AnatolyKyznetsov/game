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

export const App = () => {
    const location = useLocation()
    return (
        <Routes location={location}>
            <Route path={Paths.register} element={<RegisterPage />} />
            <Route path={Paths.login} element={<LoginPage />} />
            <Route path={Paths.endScreen} element={<EndScreenPage />} />
            <Route path={Paths.feed} element={<ForumPage />} />
            <Route path={Paths.main} element={<MainPage />} />
            <Route path={Paths.game} element={<GamePage />} />
            <Route path={Paths.startScreen} element={<StartPage />} />
            <Route path={Paths.profile} element={<ProfilePage />} />
            <Route path={Paths.editProfile} element={<EditProfilePage />} />
            <Route path={Paths.editPassword} element={<EditPasswordPage />} />
            <Route path={Paths.notFound} element={<ErrorPage title="404" />} />
            <Route path={Paths.error} element={<ErrorPage title="500" />} />
            <Route path={Paths.leaderBoard} element={<LeaderBoardPage />} />
        </Routes>
    )
}
