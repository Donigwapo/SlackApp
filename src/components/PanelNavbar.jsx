/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SlackThemePicker from "./SlackThemePicker";
import { IoIosAdd } from 'react-icons/io';
import {Link} from 'react-router-dom';
import { NavData } from "./NavData";
import Dialog from "./Dialog";
import { useMessageContext } from "@context/MessageContext";
import { useEffect, useState } from 'react';
import ChanelMessages from "@pages/ChanelMessages";
import { useNavigate } from 'react-router-dom';
import ChannelList from "@channel/ChannelList";
const PanelNavbar = () => {
    <SlackThemePicker/>
    const { currentChannel } = useMessageContext();
    //const [additionalChannels, setAdditionalChannels] = useState(new Set());
    const navigate = useNavigate();
    const [isHoverDialogVisible, setIsHoverDialogVisible] = useState(false);
    const [hoverDialogMessage, setHoverDialogMessage] = useState('');
    const userEmail = localStorage.getItem('email');
    const [channels, setChannels] = useState([]);
    const [additionalChannels, setAdditionalChannels] = useState(new Set());
  
    const handleMouseEnter = (message) => {
      setHoverDialogMessage(message);
      setIsHoverDialogVisible(true);
    };
    
    const handleMouseLeave = () => {
     setIsHoverDialogVisible(false);
    };

    const handleButtonClick = (channel) => {
      navigate(`/message-panel/channels/${channel}`);
    };

    useEffect(() => {

      // TODO: Fetch the channel data
    
      fetch('http://206.189.91.54/api/v1/channels') // This is an example API endpoint, replace with your actual endpoint
    
        .then(response => response.json())
    
        .then(data => {
    
          // Assuming the data is an array of channel objects
    
          setChannels(data);
    
        })
    
        .catch(error => {
    
          // Handle any errors that occurred during fetch
    
          console.error('Error fetching channels:', error);
    
        });
    
    }, []);

  return (
    
    <div className="slack">
      <nav className="teams">
        <ul className="teams__list">
          <li className="teams__item">
            <button className="teams__button teams__button--active">DA</button>
          </li>
          <li className="teams__item">
        <button className="teams__button">
          SS
        </button>
      </li>
      <li className="teams__item">
        <button className="teams__button">
          CS
        </button>
      </li>
      <li className="teams__item">
        <button className="teams__button">
          PA
        </button>
      </li>
      <li className="teams__item">
        <button className="teams__button">
          GF
        </button>
      </li>
      <li className="teams__item">
        <button className="teams__button">
          OP
        </button>
      </li>
      <li className="teams__item">
        <button className="teams__button">
          HP
        </button>
      </li>
      <li className="teams__item">
        <button className="teams__button">
          DH
        </button>
      </li>
        </ul>
      </nav>
      <div className="sidebar"
      >

        <button className="team-menu">
          <div className="team-menu__info">
            <h1 className="team-menu__name">Dumbledores Army</h1>
            <div className="team-menu__status">
              <span className="team-menu__username">{userEmail}</span>
            </div>
          </div>
          <span className="team-menu__alarm ion-ios-bell-outline"></span>
        </button>
        <div className="threads">
          <span className="ion-chatbubble-working threads__icon"></span> All Threads
        </div>

        <div className="channels">
      <h2 className="channels__heading">
       
      </h2>
      <ul className="channels__list">
   
      
     <ChannelList
    handleButtonClick={handleButtonClick}
    handleMouseEnter={handleMouseEnter}
    handleMouseLeave={handleMouseLeave}
    channels={additionalChannels}
  
  />

    {isHoverDialogVisible && (
    <div className="hover-dialog">{hoverDialogMessage}</div>

    )}

      </ul>
    </div>
    <div className="dm">
      <h2 className="dm__heading">
        <span>Direct Message <span className="dm__number">(29)</span>
        </span>
        <button className="ion-ios-plus-outline dm__add">
        {NavData.map((item) => {
            return (
              <Link
                key={item.id}
                className="side-item"
                to={`${item.link}`}
              >   
              <i className="icons">{item.icon}</i>
              </Link>
              
            );
          })}
        </button>
      </h2>
      <ul className="dm__list">
        <li className="dm__item">
          <button className="dm__button dm__button--slackbot"><span>slackbot</span></button>
        </li>
        <li className="dm__item">
          <button className="dm__button dm__button--online"><span>Harry Potter</span></button>
        </li>
        <li className="dm__item">
          <button className="dm__button"><span>Hermoine Granger</span></button>
        </li>
        
      </ul>
    </div>
        {/* Add channels and DM sections as needed */}
      </div>
 
    </div>

   
  );
};

export default PanelNavbar;