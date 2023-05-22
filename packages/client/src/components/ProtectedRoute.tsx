import { Navigate } from 'react-router-dom';
import { useAuthorization } from '../hooks/useAuthorization';
import { Paths } from '../utils/paths';
import { ReactElement } from 'react';

interface ProtectedRouteProps {
    component: ReactElement
    [key: string]: unknown
}

export const ProtectedRoute = ({ component, ...props }: ProtectedRouteProps) => {
    const { isAuth } = useAuthorization()

    if (!isAuth) {
        return <Navigate to={Paths.login} />
    }
    return (
        <>{component }</>
    );
}
