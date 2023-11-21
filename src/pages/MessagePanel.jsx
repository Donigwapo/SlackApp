import {  useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dialog from '@components/Dialog';
import PanelNavbar from '@components/PanelNavbar';
import { Outlet } from 'react-router';



export default function MessagePanel() {
  const location = useLocation();
  const navigate = useNavigate();

 
  // Function to handle the logout action
  const handleLogout = () => {
    // Perform any logout logic here
    // For example, you might want to clear the authentication information from local storage
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('expiry');
    localStorage.removeItem('uid');

    // Redirect to the login page or any other desired destination
    navigate('/');
  };

  useEffect(() => {
    console.log('Current Path:', location.pathname);
  }, [location.pathname]);

  return (
    <div className='dashboard-container'>
      <PanelNavbar/>
      <Outlet/>
     
      {/* Logout Button */}

      <button onClick={handleLogout}>Logout</button>

      {location.pathname === '/message-panel/create-alias' && <Dialog />}
    </div>
  );
}
