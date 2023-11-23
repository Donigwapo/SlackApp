// DialogContext.jsx

import { useEffect } from 'react';

const DialogContext = () => {
  useEffect(() => {
    const handleDialogClick = () => {
      const dialog = document.getElementById('MiniDialog');
      dialog.showModal();
    };

    const button = document.querySelector('.ion-ios-plus-outline');
    button.addEventListener('click', handleDialogClick);

    return () => {
      button.removeEventListener('click', handleDialogClick);
    };
  }, []);

  return <></>; // You can customize the JSX based on your needs
};

export default DialogContext;
