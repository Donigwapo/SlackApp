import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Dialog from '@components/Dialog';

export default function MessagePanel() {
  const location = useLocation();

  useEffect(() => {
    console.log('Current Path:', location.pathname);

  }, [location.pathname]);

  return (
    <div>
      <h1>GOGOGOGGO!</h1>
      {location.pathname === '/message-panel/create-alias' && <Dialog />}
    </div>
  );
}
