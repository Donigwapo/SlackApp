/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMessageContext } from '@context/MessageContext';
import ChannelMembersList from '@users/ChannelMembersList';
import DisplayMessage from '../DisplayMessage';

const Channel = () => {
  const { channelName, channelId } = useParams();
  const { messages, addMessage } = useMessageContext();
  const [messageText, setMessageText] = useState('');
  const [firstChannelMemberId, setFirstChannelMemberId] = useState(null);
  const [channelMembers, setChannelMembers] = useState([]);

 

  const sendMessage = async () => {
 
      try {
        const apiUrl = 'http://206.189.91.54/api/v1/messages';
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
      <div className="channelsHeaders">
        <button className="btn--channel">{channelName} Channel</button>
        <button className="btn--outlineBlack">View all members of this channel</button>
        <ul></ul>
      </div>
      <div className="headerTo">
        <button>
          <ChannelMembersList channelId={channelId} />
        </button>
      </div>
      <div className="messagesContainer">
          
    
      </div>

      <DisplayMessage recipientId={channelId} classType="Channel" />
      <div className="composeMessage">
      
        <label>
          Type your message:
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </label>
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default Channel;
