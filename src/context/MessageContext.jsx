/* eslint-disable react/prop-types */
// MessageContext.js
import { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessageContext = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentChannel, setCurrentChannel] = useState('');

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  

  const setChannel = (channelName) => {
    setCurrentChannel(channelName);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, currentChannel, setChannel }}>
      {children}
    </MessageContext.Provider>
  );
};
