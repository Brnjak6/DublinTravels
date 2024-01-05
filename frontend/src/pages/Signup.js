import React, { useState } from 'react';
import styles from '../styles/Authorize.module.scss';
import { useSignup } from '../hooks/useAuthorisation';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isError, setIsError] = useState(false);
  const { signup } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);

    //validating email and password
    if (!email) {
      setIsError('Email is missing');
    } else if (!password) {
      setIsError('Password is missing');
    } else if (!email.includes('@')) {
      setIsError('Invalid email');
    } else if (!username.length > 7) {
      setIsError('Username needs at least 8 characters');
    } else if (!password.length > 12) {
      setIsError('Password needs at least 13 characters');
    }

    if (isError === false) {
      await signup(email, password, username);
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label>Username:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          maxLength={15}
        />
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          maxLength={26}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          maxLength={20}
        />
        <button>Sign up</button>
        {isError && <p>{isError}</p>}
      </form>
    </div>
  );
}

export default Signup;
