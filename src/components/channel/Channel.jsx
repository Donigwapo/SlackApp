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
    <div>
      <h2>{channelName} Channel</h2>
      <ul>
        {channelMessages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Channel;
