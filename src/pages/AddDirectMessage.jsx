/* eslint-disable no-unused-vars */
import { useState } from 'react';
import DisplayMessage from '@components/DisplayMessage';
import { useMessageContext } from '@context/MessageContext';
const AddDirectMessage = () => {
const { addMessage, messages } = useMessageContext();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const sendMessage = async () => {
    const apiUrl = 'http://206.189.91.54/api/v1/messages';
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    const payload = {
      receiver_id: 4571,
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
        //setResponse(data.data.body);
        //saveMessageToLocal(messageBody);
        setResponse(messageBody);
        addMessage(messageBody);
   

      } else {
        // If the response status is not ok, handle the error
        setError(data.errors ? data.errors[0] : 'Unknown error');
      }

      console.log('Full Response:', response);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error sending message');
    }
  };


  const saveMessageToLocal = (messageBody) => {
  
    const messages = JSON.parse(localStorage.getItem('messages')) || [];

    messages.push(messageBody);
 
    localStorage.setItem('messages', JSON.stringify(messages));
  
  };



  return (
    <div className="pmContainer">
      <div className="headerDirect">
        <span> New Message </span>
      </div>
      <div className="headerTo">
        <span>To:</span>
      </div>
      <DisplayMessage />
      <div className="composeMessage">
        <label>
          Type your message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button onClick={sendMessage}>Send Message</button>

        {response && (
          <div style={{ marginTop: '10px' }}>
            <strong>Response:</strong> {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDirectMessage;
