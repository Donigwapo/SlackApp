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

    const button2 = document.querySelector('.ion-ios-plus-outline');
    button2.addEventListener('click', handleDialogClick);

    return () => {
      button.removeEventListener('click', handleDialogClick);
      button2.removeEventListener('click', handleDialogClick);
    };
  }, []);

  return <></>; // You can customize the JSX based on your needs
};

export default DialogContext;
