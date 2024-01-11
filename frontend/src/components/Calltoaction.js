import React, {useContext} from 'react';
import styles from '../styles/Main.module.scss';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Calltoaction() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const redirect = () => {
        if (user) {
            navigate('/account')
        } else {
            navigate('/signup')
        }
    }

  return (
    <div className={styles.cta}>
      <h3>Share your event idea now</h3>
      <button onClick={redirect}>Start</button>
    </div>
  );
}

export default Calltoaction;
