import React, { JSX } from 'react'
import { Paths } from './paths'
import { RegisterPage } from '../pages/RegisterPage'
import { LoginPage } from '../pages/LoginPage'
import { MainPage } from '../pages/MainPage'
import { ErrorPage } from '../pages/ErrorPage'
import { LeaderBoardPage } from '../pages/LeaderBoardPage'
import { GamePage } from '../pages/GamePage'
import { StartPage } from '../pages/StartPage'
import { ForumPage } from '../pages/ForumPage/ForumPage'
import { EndScreenPage } from '../pages/EndScreenPage'
import { ProfilePage } from '../pages/ProfilePage'
import { EditProfilePage } from '../pages/EditProfilePage'
import { EditPasswordPage } from '../pages/EditPasswordPage'
import { AppDispatch } from '../store/store'
import { DataSsr } from '../interfaces'
import { changeTheme } from '../store/slices/userSlice/userSlice'

interface Routes {
    path: string,
    element: JSX.Element,
    protected: boolean,
    loader?: (dispatch: AppDispatch, data: DataSsr) => void
}

export const routes: Routes[] = [
    {
        path: Paths.main,
        element: <MainPage />,
        protected: false,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.register,
        element: <RegisterPage />,
        protected: false,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.login,
        element: <LoginPage />,
        protected: false,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.notFound,
        element: <ErrorPage title="404" text="Не туда попали." />,
        protected: false,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.error,
        element: <ErrorPage title="500" text="Ошибка сервера, мы уже фиксим." />,
        protected: false,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.endScreenSuccess,
        element: <EndScreenPage title="Поздравляем!" text="Ваше время 05:12" buttonText="Далее" />,
        protected: true,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.endScreenFail,
        element: <EndScreenPage title="Game over" buttonText="Начать с начала" />,
        protected: true,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.feed,
        element: <ForumPage />,
        protected: true,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.game,
        element: <GamePage />,
        protected: true,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.startScreen,
        element: <StartPage />,
        protected: true,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.profile,
        element: <ProfilePage />,
        protected: true,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.editProfile,
        element: <EditProfilePage />,
        protected: true,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.editPassword,
        element: <EditPasswordPage />,
        protected: true,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    },
    {
        path: Paths.leaderBoard,
        element: <LeaderBoardPage />,
        protected: true,
        loader: (dispatch, data) => {
            dispatch(changeTheme(data.isLightTheme))
        }
    }
]
