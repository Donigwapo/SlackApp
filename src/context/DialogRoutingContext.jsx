/* eslint-disable react/prop-types */
// DialogContext.js
import { createContext, useContext, useState } from 'react';

const DialogRoutingContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  return (
    <DialogRoutingContext.Provider value={{ dialogVisible, showDialog, hideDialog }}>
      {children}
    </DialogRoutingContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogRoutingContext);
};
