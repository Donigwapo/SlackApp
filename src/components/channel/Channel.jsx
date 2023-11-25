/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMessageContext } from '@context/MessageContext';
import ChannelMembersList from '@users/ChannelMembersList';
import DisplayMessage from '../DisplayMessage';

const Channel = () => {
  const { channelName, channelId } = useParams();
  const { messages, addMessage } = useMessageContext();
  const [channelMessages, setChannelMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [firstChannelMemberId, setFirstChannelMemberId] = useState(null);
  const [channelMembers, setChannelMembers] = useState([]);

  useEffect(() => {
    // Fetch channel members when the component mounts
    getChannelMembers(channelId);
  }, [channelId]);

  useEffect(() => {
    // Filter messages based on the current channel
    const filteredMessages = messages.filter(message => message.channel === channelName);
    setChannelMessages(filteredMessages);
  }, [channelName, channelId, messages]);



  const sendMessage = async () => {
    // Get the list of channel members
    const members = await getChannelMembers(channelId);
    
    setChannelMembers(members);
    setFirstChannelMemberId(members.length > 0 ? members[0] : null);
  
    // Sending a message to each member
    for (const memberId of members) {
      try {
        const apiUrl = 'http://206.189.91.54/api/v1/messages';
        const accessToken = localStorage.getItem('access-token');
        const client = localStorage.getItem('client');
        const uid = localStorage.getItem('uid');
  
        const payload = {
          receiver_id: memberId,
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
            recipientId: memberId,
          });
        } else {
          // Handle error if needed
          console.error('Error sending message:', response.statusText);
        }
      } catch (error) {
        // Handle error if needed
        console.error('Error sending message:', error);
      }
    }
  
    // Clear the message input after sending
    setMessageText('');
  };
  
  const getChannelMembers = async  (channelId) => {
    const apiUrl = `http://206.189.91.54/api/v1/channels/${channelId}`;
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
          'client': client,
          'uid': uid,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.data.channel_members.map((member) => member.user_id);
        
      } else {
        const errorData = await response.json();
        console.error('Error fetching channel members:', errorData);
        return [];
      }
    } catch (error) {
      console.error('Error fetching channel members:', error);
      return [];
    }


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
      <div className="main">
      
      </div>
      <DisplayMessage recipientId={firstChannelMemberId} classType="Channel" />
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
