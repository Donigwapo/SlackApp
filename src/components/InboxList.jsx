//import { useNavigate } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import { Button } from '@button/Button';
import { useNavigate } from 'react-router-dom';


function InboxList(receiverEmail) {
    const navigate = useNavigate();


<InboxList receiverEmail={receiverEmail} />

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
  return (
    <div className="dm">
    <h2 className="dm__heading">
      <span>Direct Message <span className="dm__number">(29)</span>
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
      <button className="dm__button dm__button--slackbot"><span>sda</span></button>
      </li>
      <li className="dm__item">
        <button className="dm__button dm__button--online"><span>Harry Potter</span></button>
      </li>
      <li className="dm__item">
        <button className="dm__button dm__button--online"><span>Harry Potter</span></button>
      </li>
    </ul>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="logout-container">
    <Button buttonStyle='btn--outline'onClick={handleLogout}>Log out</Button>
  </div>
  </div>
  )
}

export default InboxList