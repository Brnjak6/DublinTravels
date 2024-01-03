import React, { useEffect, useState, useContext } from 'react';
import styles from '../styles/Authorize.module.scss';
import { useLogin } from '../hooks/useAuthorisation';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoginSuccessful } = useLogin();
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState('');
const [error, setError] = useState(false)
  

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await login(email, password, username);
  
    if (isLoginSuccessful) {
      setError(false)
    } else{
      setError(true)
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button>
          Login
        </button>{' '}
        {error && <div>Error logging in. Try again</div>}
      </form>
    </div>
  );
}

export default Login;
