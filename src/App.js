import './App.css';
import React,{useState} from 'react';
import LoginForm from './components/login';
import ProjectList from './components/project-list';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  return (
    <>
      {isLoggedIn ? <ProjectList /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
    </>
  );
}

export default App;
