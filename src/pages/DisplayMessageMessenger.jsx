/* eslint-disable react/prop-types */
import './display.css';


const Message = ({ type, text }) => (
  <div className={`message ${type}`}>
  
    <div className="speech-bubble">
      <p>{text}</p>
    </div>
  </div>
);



const Buang = () => {
 
return (
  <div className="">
 
      <Message
        type=""
        text="Why don't scientists trust atoms?"
      
      />
      <Message
        type="outgoing"
        text="I don't know"
      />
      <Message type="outgoing" text="Why?" />

      <Message
        type=""
        text="Because they make everything up!"
    
      />
    </div>
 
  );
    };

export default Buang;
