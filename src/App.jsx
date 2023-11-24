// App.jsx

import './App.css';
//import DisplayUsername from './components/DisplayUsername';
//import LoginPage from './pages/loginPage';

import { HomeNavBar } from './components/NavBar';
import { Outlet } from "react-router-dom";


function App() {

  return (
    <>
     
 
      <HomeNavBar/>
      
        
      <Outlet />
   
    </>
  )
} 

export default App
