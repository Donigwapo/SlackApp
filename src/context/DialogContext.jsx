import  { useEffect } from 'react';

const DialogContext = () => {
  useEffect(() => {
    const handleDialogClick = () => {
      if (window.innerWidth >= 768) window.MiniDialog.style.marginLeft = 'px';
      window.MiniDialog.showModal();
    };
    handleDialogClick();
    return () => {
      document.querySelector('main').removeEventListener('click', handleDialogClick);
    };
  }, []); 

  return <></>; // You can customize the JSX based on your needs
};

export default DialogContext;