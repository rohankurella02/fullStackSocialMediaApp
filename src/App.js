import './App.css';
import Home from './Pages/Home';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector(state => state.user);
  console.log({u: user.userObject})

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" element={ <Login /> } />
    </Routes>
  );
}

export default App;
