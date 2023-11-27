

import PanelNavbar from '@components/PanelNavbar';
import { Outlet } from 'react-router';



export default function MessagePanel() {



  return (
    <div className='dashboard-container'>
      <PanelNavbar/>
      <Outlet/>
     

    </div>
  );
}
