import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed.jsx'


const App = () => {

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      if (window.scrollY > 10) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <nav className='navbar'>
        <h1 className='navbar-title'>ApnaChat</h1>
      </nav>
      <Routes>
        <Route path='/' element={<Feed/>} />
        <Route path='/create-post' element={<CreatePost />} />
        

        
      </Routes>
    </Router>
  )
}

export default App