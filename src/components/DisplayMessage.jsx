/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useMessageContext } from '@context/MessageContext';
import UserList from '@users/UsersList';

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

        const url1 = 'http://206.189.91.54/api/v1/messages?receiver_id=4578&receiver_class=User';
        const url2 = 'http://206.189.91.54/api/v1/messages?receiver_id=4577&receiver_class=User'; // Your second URL

        const [response1, response2] = await Promise.all([

          fetch(url1, {
    
            headers: {
    
              'Content-Type': 'application/json',
              'access-token': accessToken,
              'client': client,
              'uid': uid,
    
            },
    
          }),
    
          fetch(url2, {
    
            headers: {
    
              'Content-Type': 'application/json',
              'access-token': accessToken,
              'client': client,
              'uid': uid,
    
            },
    
          }),
    
        ]);


    
    if (response1.ok && response2.ok) {

      const data1 = await response1.json();

      const data2 = await response2.json();

      // For demonstration, we combine messages from both responses

      const combinedMessages = [...data1.data, ...data2.data];

      setMessages(combinedMessages);

    } else {

      throw new Error('Failed to fetch messages from one or both endpoints');

    }

  } catch (error) {

    console.error('Error fetching messages:', error);

    setError(error.message);

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
