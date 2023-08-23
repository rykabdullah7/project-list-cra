import './App.css';
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; 
import LoginForm from './components/login';
import ProjectList from './components/project-list';

function PrivateRoute({ element: Element, isLoggedIn }) { 
  return isLoggedIn ? <Element /> : <Navigate to="/login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  return (
 
      <Routes> 
        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path="/project-list"
          element={<PrivateRoute element={ProjectList} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/" element={<Navigate to="/login" />} /> 
      </Routes>
    
  );
}

export default App;
