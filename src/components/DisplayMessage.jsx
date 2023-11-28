/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState,useRef } from 'react';
import { useMessageContext } from '@context/MessageContext';
import Spinner from '@utils/spinner';
import InboxList from './InboxList';
const Message = ({ type, text }) => (
  <div className={`message ${type}`}>
    <div className="speech-bubble">
      <p>{text}</p>
    </div>
  </div>
);
const DisplayMessage = ({ recipientId, classType }) => {
  const { addMessage } = useMessageContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAllMessages, setShowAllMessages] = useState(false);
  const limitedMessages = showAllMessages ? messages : messages.slice(-11);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve authentication tokens from local storage
        const accessToken = localStorage.getItem('access-token');
        const client = localStorage.getItem('client');
        const uid = localStorage.getItem('uid');
        setLoading(true);
        // Check if tokens are available
        if (!accessToken || !client || !uid) {
          setError('Authentication tokens not found');
          return;
        }
        const apiUrl = `http://206.189.91.54/api/v1/messages?receiver_id=${recipientId}&receiver_class=${classType}`;
        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': accessToken,
            'client': client,
            'uid': uid,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data.data);
          console.log(data.data); 
        } else {
          throw new Error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (recipientId) {
      fetchData();
    } else {
      // Clear messages if no recipient is selected
      setMessages([]);
    }
  }, [recipientId, classType, messages]);
  if (error) {
    return <p>Error: {error}</p>;
  }

  
  const handleShowAllMessages = () => {
    setShowAllMessages(true);
  };

  

  const breakLine = (text) => {

    const maxLength = 50;

    let brokenText = '';

    for (let i = 0; i < text.length; i += maxLength) {

      brokenText += text.slice(i, i + maxLength) + '\n';

    }

    return brokenText.trim();

  };

  const sender = messages[0]?.sender; // Assuming messages[0] is the latest message

  const receiver = messages[0]?.receiver; // Assuming messages[0] is the latest message

  const senderEmail = sender ? sender.email : '';

  const senderCreatedAt = sender ? sender.created_at : '';

  const receiverEmail = receiver ? receiver.email : '';

  const receiverCreatedAt = receiver ? receiver.created_at : '';
  
  return (
    <div className="messageDisplayContainer">
      <div className="messageList" >
      <span>
     
              Sender email: {senderEmail} / Created at: {senderCreatedAt} <br />

              Receiver email: {receiverEmail} / Created at: {receiverCreatedAt}

            </span>
        {messages.length === 0 ? (
          <span>
            <h1>👋 Hello! This is your first message. Please follow the rules and guidelines.</h1>
          </span>
        ) : (
          <>
            {messages.length > 11 && !showAllMessages && (
              <button onClick={handleShowAllMessages}>Click to view messages</button>
            )}
            {limitedMessages.map((message, index) => (
               <Message key={index} type="" text={breakLine(message.body)} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default DisplayMessage;
