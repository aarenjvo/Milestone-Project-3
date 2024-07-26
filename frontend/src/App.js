import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Home from './views/home';
import Creation from './views/creation';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Creation" element={<Creation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
