import {  useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateAlias from '@components/CreateAlias';
import PanelNavbar from '@components/PanelNavbar';
import { Outlet } from 'react-router';



export default function MessagePanel() {
  const location = useLocation();
  const navigate = useNavigate();

 
  // Function to handle the logout action
  const handleLogout = () => {

    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('expiry');
    localStorage.removeItem('uid');

    navigate('/');
  };

  useEffect(() => {
    console.log('Current Path:', location.pathname);
  }, [location.pathname]);

  return (
    <div className='dashboard-container'>
      <PanelNavbar/>
      <Outlet/>
     
      { handleLogout }

    

      {location.pathname === '/message-panel/create-alias' && <CreateAlias />}
    </div>
  );
}
