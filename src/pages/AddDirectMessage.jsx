/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import DisplayMessage from '@components/DisplayMessage';
import { useMessageContext } from '@context/MessageContext';
import UserList from '@users/UsersList';



const AddDirectMessage = () => {
  const { addMessage, messages } = useMessageContext();
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [userOptions, setUserOptions] = useState([]); // State to store user options for the dropdown

  const onUsersFetched = (userData) => {
    if (userData && userData.length > 0) {
      setUserOptions(userData.map(user => ({ value: user.id, label: user.email })));
    }
  };
  useEffect(() => {
    // Fetch user data and set options when the component mounts
    onUsersFetched([]); // Pass an empty array initially
  }, []); // Empty dependency array to fetch users only once when the component mounts


  const sendMessage = async () => {
    const apiUrl = 'http://206.189.91.54/api/v1/messages';
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    const payload = {
      receiver_id: recipientId,
      receiver_class: 'User',
      body: message,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
          'client': client,
          'uid': uid,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        const messageBody = data.data.body;
        setResponse(messageBody);
        addMessage(messageBody);
      } else {
        setError(data.errors ? data.errors[0] : 'Unknown error');
      }

    
      
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error sending message');
    }
  };

  return (
    <div className="pmContainer">
    <div className="headerDirect">
      <span> New Message </span>
    
    </div>
    <div className="headerTo">
      <span>To:</span>
      {/* Use the options from the state for the dropdown */}
    
      <select value={recipientId} onChange={(e) => setRecipientId(e.target.value)}>
      <UserList onUsersFetched={onUsersFetched} />
        <option value="" disabled>Select a recipient</option>
        {userOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    <DisplayMessage recipientId={recipientId} />
    <div className="composeMessage">
      <label>
        Type your message:
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button onClick={sendMessage}>Send Message</button>

      {response && (
        <div style={{ marginTop: '10px' }}>
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  </div>
);
};


export default AddDirectMessage;
