/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import DisplayMessage from '@components/DisplayMessage';
import { useMessageContext } from '@context/MessageContext';
import UserList from '@users/UsersList';
import Spinner from '@utils/spinner';

const AddDirectMessage = () => {
  const { addMessage, messages } = useMessageContext();
  const [message, setMessageText] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [userOptions, setUserOptions] = useState([]); // State to store user options for the dropdown
  const [loading, setLoading] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);


  const onUsersFetched = (userData) => {

    setLoading(true); // Set loading to true at the beginning of the fetch process

    if (userData && userData.length > 0) {
  
      let processedUserData = userData;
  
      // Only apply the filter and sort if the checkbox is checked
  
      if (isCheckboxChecked) {
  
        const startDate = new Date("2023-10-01T07:31:20.010Z");
  
        processedUserData = processedUserData.filter(user => 
  
          new Date(user.created_at) >= startDate
  
        );
  
        processedUserData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
      }
  
      // Map user data to user options, after potential filtering and sorting
  
      const userOptions = processedUserData.map(user => ({
  
        value: user.id,
  
        label: user.email
  
        // Include created_at if needed: created_at: user.created_at
  
      }));
  
      setUserOptions(userOptions);
  
    }
  
    setLoading(false); // Set loading to false at the end of the fetch process
  
  };
  useEffect(() => {
    // Fetch user data and set options when the component mounts
    setLoading(true); 
    onUsersFetched([]); // Pass an empty array initially
    
  const storedRecipientId = localStorage.getItem('recipientId');
  if (storedRecipientId) {
    setRecipientId(storedRecipientId);
  }

  }, []); // Empty dependency array to fetch users only once when the component mounts

 
  const sendMessage = async () => {
    const currentMessage = message;
    setMessageText('Sending...');
    setLoading(true); 
    localStorage.setItem('recipientId', recipientId);
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
    }finally {
      setMessageText(currentMessage);
      setLoading(false); 
    }
    setMessageText('');
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
      <option value="" disabled>

  </option>
      <UserList onUsersFetched={onUsersFetched} />
          {userOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
  
        <input
          type="checkbox"
          checked={isCheckboxChecked}
          onChange={(e) => setIsCheckboxChecked(e.target.checked)}
/>
            <span>Tick if you want to Display accounts Created on: October 2023</span>
    </div>
  
    <div className="messagesContainer">

      <DisplayMessage recipientId={recipientId} classType="User" />

      </div>

  <div className="composeMessage">
  <input
    type="text"
    value={message}
    onChange={(e) => setMessageText(e.target.value)}
    disabled={loading}
  />
  <button onClick={sendMessage} >
    Send
  </button>
</div>
  </div>
);
};


export default AddDirectMessage;