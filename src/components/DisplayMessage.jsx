/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useMessageContext } from '@context/MessageContext';

const DisplayMessage = () => {
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

        const response = await fetch('http://206.189.91.54/api/v1/messages?receiver_id=4571&receiver_class=User', {
          headers: {
            'Content-Type': 'application/json',
            'access-token': accessToken,
            'client': client,
            'uid': uid,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Data from API:', data);
          setMessages(data.data);
        } else {
          console.error('Failed to fetch messages:', response.statusText);
          setError('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Error fetching messages');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure it only runs once when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="messageDisplayContainer">
      <h2>Messages</h2>
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
