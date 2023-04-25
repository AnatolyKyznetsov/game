import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Paths } from './utils/paths'
import { MainPage } from './pages/MainPage/MainPage'

export const App = () => {
    const location = useLocation()
    return (
        <Routes location={location}>
            <Route path={Paths.register} element={<RegisterPage />} />
            <Route path={Paths.login} element={<LoginPage />} />
            <Route path={Paths.main} element={<MainPage />} />
        </Routes>
    )
}
