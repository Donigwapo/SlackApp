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
const PanelNavbar = () => {
    <SlackThemePicker/>
    const { currentChannel } = useMessageContext();
    const [additionalChannels, setAdditionalChannels] = useState(new Set());
    const navigate = useNavigate();
    const [isHoverDialogVisible, setIsHoverDialogVisible] = useState(false);
    const [hoverDialogMessage, setHoverDialogMessage] = useState('');
  
    const handleMouseEnter = (message) => {
      setHoverDialogMessage(message);
      setIsHoverDialogVisible(true);
    };
    
    const handleMouseLeave = () => {
     setIsHoverDialogVisible(false);
    };

    useEffect(() => {
      const storedChannels = JSON.parse(localStorage.getItem('additionalChannels')) || [];
      setAdditionalChannels(new Set(storedChannels));
    }, []);

    useEffect(() => {
      if (currentChannel) {
        setAdditionalChannels(prevChannels => {
          const updatedChannels = new Set([...prevChannels, currentChannel]);
  
          // Save additional channels to localStorage
          localStorage.setItem('additionalChannels', JSON.stringify([...updatedChannels]));
  
          return updatedChannels;
        });
      }
    }, [currentChannel]);

    const handleButtonClick = (channel) => {
      navigate(`/message-panel/channels/${channel}`);
    };
    
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
              <span className="team-menu__username">ramenhog</span>
            </div>
          </div>
          <span className="team-menu__alarm ion-ios-bell-outline"></span>
        </button>
        <div className="threads">
          <span className="ion-chatbubble-working threads__icon"></span> All Threads
        </div>
        <div className="channels">
      <h2 className="channels__heading">
        <span>Channels <span className="channels__number">(16)</span>
        </span>
        <button className="ion-ios-plus-outline channels__add">
        <IoIosAdd size={30}/><Dialog/>
        </button>
      </h2>
      <ul className="channels__list">
      
      {Array.from(additionalChannels).map((channel, index) => (
      <li key={index} className="channels__item">
        <button
          className="channels__button"
          onClick={() => handleButtonClick(channel)}
          onMouseEnter={() => handleMouseEnter("I'm a button")}
          onMouseLeave={handleMouseLeave}
        >

          <span>{channel}</span>
        </button>
      </li>
      ))}

    {isHoverDialogVisible && (
    <div className="hover-dialog">{hoverDialogMessage}</div>

    )}

      </ul>
    </div>
    <div className="dm">
      <h2 className="dm__heading">
        <span>DM <span className="dm__number">(29)</span>
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