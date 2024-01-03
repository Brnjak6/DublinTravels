import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useAuthorisation';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { ReactComponent as LogoSVG } from '../img/logo.svg';
import { ReactComponent as SunSVG } from '../img/sun.svg';
import { ReactComponent as UserSVG } from '../img/user.svg';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const { logout } = useLogout();
  const { user } = useContext(AuthContext);
  const [temperature, setTemperature] = useState('');
  const navigate = useNavigate();

  //Consuming external api for displaying weather in Dublin
  const api = process.env.REACT_APP_weatherAPI;
  const location = 'Dublin';
  const url = `https://api.weatherapi.com/v1/current.json?key=${api}&q=${location}`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          setTemperature(data.current.temp_c);
        }
      } catch (error) {
        console.error('Error fetching weather:', error.message);
      }
    };

    fetchWeather();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className="navigation">
        <div className="logo">
          <Link to="/">
            <LogoSVG />
          </Link>
          <Link to="/">
            <h2>Dublin Travels</h2>
          </Link>
          <div className="sun">
            <SunSVG />
            {temperature !== null ? <p>{temperature} °C</p> : <p>Loading...</p>}
          </div>
        </div>

        <nav>
          <ul>
            {user && (
              <div className="account">
                <Link to="/account" className="username">
                  <div className="usernameSVG">
                    <UserSVG />
                  </div>
                  {user.username}
                </Link>
                <button onClick={handleLogout}>Log out</button>
              </div>
            )}
            {!user && (
              <div className="account">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
