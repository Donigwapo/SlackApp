// App.jsx

import './App.css';
//import DisplayUsername from './components/DisplayUsername';
//import LoginPage from './pages/loginPage';


import { Outlet } from "react-router-dom";


function App() {

  return (
    <>
        
      <Outlet />
   
    </>
  )
} 

export default App
