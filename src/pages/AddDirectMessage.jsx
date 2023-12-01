/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import DisplayMessage from '@components/DisplayMessage';
import { useMessageContext } from '@context/MessageContext';
import UserList from '@users/UsersList';


const AddDirectMessage = () => {
  const { addMessage, messages } = useMessageContext();
  const [message, setMessageText] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [userOptions, setUserOptions] = useState([]); // State to store user options for the dropdown
  const [loading, setLoading] = useState(false);
  

  const onUsersFetched = (userData) => {
    setLoading(true); 
    if (userData && userData.length > 0) {
      let processedUserData = userData;
        const startDate = new Date("2023-12-01T07:31:20.010Z");
        processedUserData = processedUserData.filter(user => 
          new Date(user.created_at) >= startDate
        );
        processedUserData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
   
      const userOptions = processedUserData.map(user => ({

        value: user.id,
  
        email: user.email
  

      }));
  
      setUserOptions(userOptions);
  
    }
  
    setLoading(false); 
  
  };
  useEffect(() => {
    setLoading(true); 
    onUsersFetched([]); 
  

  }, []);

 
  const sendMessage = async () => {
    const currentMessage = message;
    setMessageText('Sending...');
    setLoading(true); 
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

        const selectedData = {

          id: recipientId,

        };

        const savedData = JSON.parse(localStorage.getItem('selected-data')) || [];
        const isDuplicateId = savedData.some(data => data.id === recipientId);
        if (!isDuplicateId) {
        
          savedData.push(selectedData);
        
          localStorage.setItem('selected-data', JSON.stringify(savedData));
       }
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
/>
  <button onClick={sendMessage} >
    Send
  </button>
</div>
  </div>
);
};


export default AddDirectMessage;