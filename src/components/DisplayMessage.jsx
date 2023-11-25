/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useMessageContext } from '@context/MessageContext';


const DisplayMessage = ({ recipientId, classType }) => {
  const { addMessage } = useMessageContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve authentication tokens from local storage
        const accessToken = localStorage.getItem('access-token');
        const client = localStorage.getItem('client');
        const uid = localStorage.getItem('uid');

        // Check if tokens are available
        if (!accessToken || !client || !uid) {
          setLoading(false);
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
  }, [recipientId, classType]);  

  if (loading) {
    return <p>Loading..</p>
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="messageDisplayContainer">
 
      <div className="messageList">
        {messages.map((message, index) => (
          <div key={index} className="messageItem">
            {message.body}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayMessage;
