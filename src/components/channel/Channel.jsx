// Channel.jsx
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMessageContext } from '@context/MessageContext';

const Channel = () => {
  const { channelName } = useParams();
  const { messages } = useMessageContext();
  const [channelMessages, setChannelMessages] = useState([]);

  useEffect(() => {
    // Filter messages based on the current channel
    const filteredMessages = messages.filter(message => message.channel === channelName);
    setChannelMessages(filteredMessages);
  }, [channelName, messages]);

  return (
    <div className="pmContainer">
      <div className="channelsHeaders">
      <button className="btn--outlineBlack">{channelName} Channel</button>
      
      <button className="btn--outlineBlack">View all members of this channel</button>
      <ul>
       
      </ul>
      </div>
      <div className="headerTo">
        <span>To:</span>
      </div>
      <div className="composeMessage">
      {channelMessages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      <label>
          Type your message:
          <input
            type="text"
            value={""}
            onChange={""}
          />
          </label>
          <button onClick={""}>Send Message</button>
         </div> 
    </div>
  );
};

export default Channel;