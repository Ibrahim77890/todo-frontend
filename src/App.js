import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path='/todo' element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
