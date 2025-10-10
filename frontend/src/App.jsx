import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'

  function App() {
  // optional user object
  const user = { profilePic: null }; 

  return <LandingPage user={user} />;
}

export default App;
