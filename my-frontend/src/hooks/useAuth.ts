// src/hooks/useAuth.ts
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../features/authSlice';
import { RootState } from '../store';

interface User {
  username: string;
  email: string;
  role: string; // Ensure the user object includes a role property
}

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user as User);
  const token = useSelector((state: RootState) => state.auth.token);

  const login = (userData: { user: User; token: string }) => {
    // Save user data and token to local storage
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    dispatch(setUser(userData));
  };

  const signOut = () => {
    // Remove user data and token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
  };

  return { user, token, login, signOut };
};

export default useAuth;