import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Show from './pages/Show';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/add" element={<PrivateRoute element={<Add />} />} />
          <Route path="/edit/:id" element={<PrivateRoute element={<Edit />} />} />
          <Route path="/show/:id" element={<PrivateRoute element={<Show />} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;