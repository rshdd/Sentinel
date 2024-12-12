import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TechSupportForm from './Form';
import Macros from './Macros';

function App() {
  return (
    <Router>
      <div className="App" style={{ padding: '20px' }}>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/outreach" style={{ textDecoration: 'none', color: 'blue' }}>
                Manage Outreaches
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TechSupportForm />} />
          <Route path="/outreach" element={<Macros />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
