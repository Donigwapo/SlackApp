// Channel.jsx
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMessageContext } from '@context/MessageContext';
import ChannelDetails from './channel';

const Channel = () => {
  const { channelName } = useParams();
  const { messages } = useMessageContext();
  const [channelMessages, setChannelMessages] = useState([]);

  const [hoveredChannel, setHoveredChannel] = useState(null);

  const handleMouseEnter = (channel) => {
    setHoveredChannel(channel);
  };

  const handleMouseLeave = () => {
    setHoveredChannel(null);
  };

  useEffect(() => {
    // Filter messages based on the current channel
    const filteredMessages = messages.filter(message => message.channel === channelName);
    setChannelMessages(filteredMessages);
  }, [channelName, messages]);

  return (
    <div className="pmContainer">
      <div className="headerDirect">
      <h2>{channelName} Channel</h2>
      <ul>
        {channelMessages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      </div>
      <div className="headerTo">
        <span>To:</span>
      </div>
      <div className="composeMessage">
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