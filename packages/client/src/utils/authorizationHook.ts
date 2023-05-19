import { useAppDispatch, useAppSelector } from '../store/hooks'
import { RootState } from '../store/store'
import { SigninData } from '../interfaces'
import { getUserInfo, logoutUser, signinUser } from '../store/slices/userSlice/actions'

export const useAuthorization = () => {
    const isAuth = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const signin = (data: SigninData) => {
        dispatch(signinUser(data));
    }

    const logout = () => {
        dispatch(logoutUser());
    }

    const user = () => {
        dispatch(getUserInfo());
    }

    return { isAuth, signin, logout, user }
}
