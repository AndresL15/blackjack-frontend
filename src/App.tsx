import logo from './logo.svg';
import './App.css';
import Sidebar from './app/sidebar/Sidebar';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Welcome from './app/Welcome';
import Register from './user/Register';
import Login from './user/Login';
import { StateLoggedInRoute } from './common/components/LoggedInRoute';
import Info from './info/Info';
import { Room } from './room/Room';
import { JoinRoom } from './room/JoinRoom';
import { Blackjack } from './blackjack/Blackjack';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>BlackJack</h1>
        </header>
        <div className="row">
          <div className="col-sm-2" id="sidebar">
            <Sidebar />
          </div>
          <div className="col-sm-10" id="content">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/info" element={<StateLoggedInRoute component={Info} />} />
              {/* <Route path="/room" element={<StateLoggedInRoute component={Room} />} />
              <Route path="/joinroom" element={<StateLoggedInRoute component={JoinRoom} />} />
              <Route path="/blackjack" element={<StateLoggedInRoute component={Blackjack} />} /> */}
              <Route path="/room" element={<Room />} />
              <Route path="/joinroom" element={<JoinRoom />} />
              <Route path="/blackjack" element={<Blackjack />} />
            </Routes>
          </div>
        </div>
      </div>
      <Outlet />
    </BrowserRouter>
  );
}

export default App;
