//import { useNavigate } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import { Button } from '@button/Button';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
function InboxList() {
    const navigate = useNavigate();
    const [emailCount, setEmailCount] = useState(0);
    const [sentEmails, setSentEmails] = useState([]);
    const limitedEmails = [...sentEmails.slice(0, 4)];


    const handleLogout = () => {

        localStorage.removeItem('access-token');
        localStorage.removeItem('client');
        localStorage.removeItem('expiry');
        localStorage.removeItem('uid');
        localStorage.removeItem('recipientId');
    
        navigate('/');
      };

      const handleButtonClick = () => {
        navigate(`/message-panel/send-message/`);
       
      };

      useEffect(() => {

        const existingEmails = localStorage.getItem('sentEmails');
    
        if (existingEmails) {
    
          const parsedEmails = JSON.parse(existingEmails);
    
          setSentEmails(parsedEmails);
    
        }
    
      }, []);

      useEffect(() => {

        const existingEmails = localStorage.getItem("sentEmails");
    
        if (existingEmails) {
    
          const parsedEmails = JSON.parse(existingEmails);
    
          setSentEmails(parsedEmails);
    
          setEmailCount(parsedEmails.length);
    
        }
    
      }, []);

      if (sentEmails.length > 5) {

        limitedEmails.push("...");
      
      }
  return (
    <div className="dm">
    <h2 className="dm__heading">
      <span>Direct Message <span className="dm__number">({emailCount})</span>
      </span>
      
      <button
            className="ion-ios-plus-outline channels__add"
            onClick={() => handleButtonClick()}

          >
    <IoIosAdd size={30}/>

   </button>
    </h2>
    <ul className="dm__list">
      
      <li className="dm__item">
     
      {limitedEmails.map((email, index) => {

          const [username] = email.split("@");

          return (

            <li className="dm__item" key={index}>

              <button className="dm__button dm__button--online">

                <span>{username}</span>

              </button>

            </li>

          );

          })}
      </li>
   
    </ul>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="logout-container">
    <Button buttonStyle='btn--outline'onClick={handleLogout}>Log out</Button>
  </div>
  </div>
  )
}

export default InboxList