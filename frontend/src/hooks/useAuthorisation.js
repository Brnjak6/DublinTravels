import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useSignup = () => {
  const [isError, setIsError] = useState(null);
  const { dispatch } = useContext(AuthContext);

// This is the logic for accessing backend routes for login and signup page

//Once the user tries to signup on the signup page, they insert the email and password and then we make user logged in as well and put the data in local storage
  const signup = async (email, password, username) => {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsError(data.error);
    } else {
      //here we technically need our signed up user to log in and to have users data accessable in local storage
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
    }
  };

  return { signup, isError };
};

// When we want user to be logged out, all we need is to remove it from local storage and by accessing useContext with type LOGOUT we remove user from AuthContext
export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem('user');

    dispatch({ type: 'LOGOUT' });
  };
  return { logout };
};

// Same as with signup, but we need to verify email and password are matching and only then if response is ok we can set the user up in local storage
export const useLogin = () => {
  const [isError, setIsError] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const login = async (email, password) => {
    setIsError(null);

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      setIsError(data.error);
      setIsLoginSuccessful(false);
    } else {
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      setIsLoginSuccessful(true);
    }
  };

  return { login, isError, isLoginSuccessful };
};