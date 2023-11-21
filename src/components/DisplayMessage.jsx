
import { useMessageContext } from '@context/MessageContext';

const DisplayMessage = () => {
  const { messages } = useMessageContext();

  return (
    <div className="messageDisplayContainer">
      <h2>Messages</h2>
      <div className="messageList">
        {messages.map((messageBody, index) => (
          <div key={index} className="messageItem">
            {messageBody}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayMessage;
