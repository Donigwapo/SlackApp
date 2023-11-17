// App.jsx

import './App.css';
//import DisplayUsername from './components/DisplayUsername';
//import LoginPage from './pages/loginPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
//import './home.css';
//import "./components/Navbar.css";

import { HomeNavBar } from './components/NavBar';
import Home from '@pages/Home';
import Resources from '@pages/Resources';
import Product from '@pages/Product';
import Features from '@pages/Features';
import Pricing from '@pages/Pricing';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <>
      <Router>
      <HomeNavBar/>
      <Routes>
      <Route path='/' exact element={ <Home />}></Route>
      <Route path='/productOverview' exact element={ <Product />}></Route>
      <Route path='/features' exact element={ <Features />}></Route>
      <Route path='/pricing' exact element={ <Pricing />}></Route>
      <Route path='/resources' exact element={ <Resources />}></Route>
      <Route path='/loginPage' exact element={ <LoginPage />}></Route>
      
      </Routes>
      </Router>
    </>
  )
} 

export default App
