import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Home from './views/home';
import Creation from './views/creation';
import SignUp from './components/Signup'
import Login from './components/Login'
import CurrentUserProvider from './contexts/CurrentUser';
import Main from './views/main';

function App() {
  return (
    <div className='App'>
      <CurrentUserProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/Creation" element={<Creation />} />
            <Route exact path="/Main" element={<Main/>} />
          </Routes>
        </Router>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
