import { useAuthorization } from '../hooks/useAuthorization';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement, useState } from 'react';
import { Paths } from '../utils/paths';
import { useAppDispatch } from '../store/hooks';
import { getUserInfo } from '../store/slices/userSlice/actions';
import { Loader } from './Loader';

export function RequiredAuth({ children }: {children: ReactElement}) {
    const [ loading, setLoading ] = useState(true)
    const { isAuth } = useAuthorization()
    const location = useLocation();

    if (isAuth) {
        return children;
    } else {
        const dispatch = useAppDispatch()

        dispatch(getUserInfo()).then(() => {
            setLoading(false)
        })

        if (loading) {
            return <main className='main'><Loader /></main>
        }
    }

    return <Navigate to={Paths.login} state={{ from: location }}/>
}
