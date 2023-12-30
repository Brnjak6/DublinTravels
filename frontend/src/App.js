import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Nav from './components/Nav';
import './styles/Base.scss';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <div className="routes">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path='/account' element={<Account/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
