/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMessageContext } from '@context/MessageContext';
import ChannelMembersList from '@users/ChannelMembersList';
import DisplayMessage from '../DisplayMessage';
import UserList from '@users/UsersList';
import { toastSuccess, toastError } from "@utils/toastify";
import { toast } from 'react-toastify';

const Channel = () => {
  const { channelName, channelId } = useParams();
  const {  addMessage } = useMessageContext();
  const [messageText, setMessageText] = useState('');
  const [userOptions, setUserOptions] = useState([]);
  const [recipientId, setRecipientId] = useState('');
  const [error, setError] = useState('');

  const onUsersFetched = (userData) => {
    if (userData && userData.length > 0) {
      setUserOptions(userData.map(user => ({ value: user.id, label: user.email })));
    }

  };
  useEffect(() => {
    // Fetch user data and set options when the component mounts
 
    onUsersFetched([]); 
  }, []);


  const addMember = async () => {
    try {
    const apiUrl = 'https://206.189.91.54/api/v1/channel/add_member';
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    const payload = {
      id: channelId,
      member_id: recipientId,
    };

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
    
  if (response.ok) {
    const data = await response.json();
    console.log('Member added successfully:', data);
  } else {
    const errorData = await response.json();
    console.error('Failed to add member:', errorData);
  }
} catch (error) {
  console.error('Error adding member:', error.message);
}
 }


   const sendMessage = async () => {

  
    if (!messageText.trim()) {
      toastError("Please enter a message.");  
      return;  
    }

    setError('');


      try {
        const apiUrl = 'https://206.189.91.54/api/v1/messages';
        const accessToken = localStorage.getItem('access-token');
        const client = localStorage.getItem('client');
        const uid = localStorage.getItem('uid');
  
        const payload = {
          receiver_id: channelId,
          receiver_class: 'Channel',
          body: messageText, // Use messageText instead of message
        };
  
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
  
        if (response.ok) {
          // Assuming addMessage function adds a message to the context
          await addMessage({
            text: messageText,
            channel: channelName,
            recipientId: channelId,
          });
        } else {
          // Handle error if needed
          console.error('Error sending message:', response.statusText);
        }
      } catch (error) {
        // Handle error if needed
        console.error('Error sending message:', error);
      }

    setMessageText('');
  };

  return (
    <div className="pmContainer">
      <div className="headerDirect">
        <button className="btn--channel">{channelName} Channel</button>
      </div>
      <div className="headerTo">
        <button>
          <ChannelMembersList channelId={channelId} />
        </button>
        <button>Add members</button> 

        <select value={recipientId} onChange={(e) => {
          setRecipientId(e.target.value);
          addMember();
        }}>
      <option value="" disabled>
  </option>
      <UserList onUsersFetched={onUsersFetched} />
          {userOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="messagesContainer">
      <DisplayMessage recipientId={channelId} classType="Channel" />
   
      </div>

    
      <div className="composeMessage">
      
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
     
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Channel;
