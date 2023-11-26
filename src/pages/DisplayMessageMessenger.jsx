/* eslint-disable react/prop-types */
import '@pages/display.css'
import  { useEffect } from 'react';

const Message = ({ type, text }) => (
  <div className={`message ${type}`}>
  
    <div className="speech-bubble">
      <p>{text}</p>
    </div>
  </div>
);



const App = () => {
    useEffect(() => {
        activateMessages(0);
      }, []);
    
      function activateMessages(i) {
        const messages = document.querySelectorAll('.message');
    
        messages[i].classList.add('active');
    
        if (i === messages.length - 1) {
          return;
        }
    
        setTimeout(function () {
          activateMessages(i + 1);
        }, 500);
      }
return (
  <div className="outer-wrap">
    <div className="wrap">
      <Message
        type=""
        text="Why don't scientists trust atoms?"
      
      />
    
    </div>
    <div className="wrap">
      <Message
        type="outgoing"
        text="I don't know"
     
      />
      <Message type="outgoing" text="Why?" />
    </div>
    <div className="wrap">
      <Message
        type=""
        text="Because they make everything up!"
    
      />
    </div>
  </div>
  );
    };

export default App;
