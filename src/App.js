import './App.css';
import React, { useState} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; 
import LoginForm from './components/login';
import ProjectList from './components/project-list';
import UserContext from './components/user-context';

function PrivateRoute({ element: Element, isLoggedIn}) { 
  return isLoggedIn ? <Element  /> : <Navigate to="/login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');


  function handleLoginSuccess(accessToken) {
    setIsLoggedIn(true);
    setToken(accessToken);
    
  }

  return (
    <Routes> 
      <Route
        path="/login"
        element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
      />
      
      <Route
        path="/project-list"
        element={<UserContext.Provider value={token}><PrivateRoute element={ProjectList} isLoggedIn={isLoggedIn} /></UserContext.Provider>}
      />
      
      
      <Route path="/" element={<Navigate to="/login" />} /> 
    </Routes>
  );
}

export default App;
