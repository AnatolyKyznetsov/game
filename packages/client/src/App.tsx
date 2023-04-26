import { Register } from './pages/Register'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Paths } from './utils/paths'

export const App = () => {
    const location = useLocation()
    return (
        <Routes location={location}>
            <Route path={Paths.register} element={<Register />} />
        </Routes>
    )
}
