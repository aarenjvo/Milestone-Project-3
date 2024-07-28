import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Home from './views/home';
import Creation from './views/creation';
import SignUp from './components/Signup'
import Main from './views/main';
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/Creation" element={<Creation />} />
          <Route exact path="/Main" element={<Main/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
