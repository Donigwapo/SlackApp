// App.jsx

import './App.css';
//import DisplayUsername from './components/DisplayUsername';
//import LoginPage from './pages/loginPage';

import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';


import { HomeNavBar } from './components/NavBar';
import Home from '@pages/Home';
import Resources from '@pages/Resources';
import Product from '@pages/Product';
import Features from '@pages/Features';
import Pricing from '@pages/Pricing';
import LoginPage from './pages/loginPage';
import MessagePanel from './pages/MessagePanel';


function App() {
  return (
    <>
       <Router>
  <Routes>
    <Route path="/message-panel" element={<MessagePanel />} />
    <Route
      path="/"
      element={
        <>
          <HomeNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productOverview" element={<Product />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/loginPage" element={<LoginPage />} />
          </Routes>
        </>
      }
    />
  </Routes>
</Router>
   
    </>
  )
} 

export default App
