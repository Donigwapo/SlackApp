/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import DisplayMessage from '@components/DisplayMessage';
import UserList from '@users/UsersList';
import { toastError, toastSuccess } from "@utils/toastify";
import { toast } from 'react-toastify';

const AddDirectMessage = () => {
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
  
      if (isCheckboxChecked) {
  
        const startDate = new Date("2023-10-01T07:31:20.010Z");
  
        processedUserData = processedUserData.filter(user => 
  
          new Date(user.created_at) >= startDate
  
        );
  
        processedUserData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
      }else{
        processedUserData.sort((a, b) => a.email.localeCompare(b.email));
      } 


      const userOptions = processedUserData.map(user => ({
        value: user.id,
        email: user.email
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
    toast.loading('Sending...');

    if (!recipientId) {
      toastError("Please select a recipient.");  
      return; 
    }

    if (!message.trim()) {
      toastError("Please enter a message.");  
      return;  
    }

    setError('');



    const currentMessage = message;
    
    setLoading(true); 
    localStorage.setItem('recipientId', recipientId);
    const apiUrl = 'https://206.189.91.54/api/v1/messages';
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
        toast.dismiss();
       
     
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
     
      <select className="select" value={recipientId} onChange={(e) => {

          const selectedIndex = e.target.selectedIndex;

          const email = e.target.options[selectedIndex].getAttribute('data-email');

          setRecipientId(e.target.value);

          }}>

 <option value="" disabled>
  </option>
      <UserList onUsersFetched={onUsersFetched} />
          {userOptions.map((option) => (
            <option key={option.value} value={option.value} data-email={option.email}>
              {option.email}
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
  <textarea

    type="text"
    value={message}
    onChange={(e) => setMessageText(e.target.value)}
    disabled={loading}
    rows={4}
    wrap="soft" 
  />
  <button onClick={sendMessage} >
    Send
  </button>
</div>
  </div>
);
};


export default AddDirectMessage;