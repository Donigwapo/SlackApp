/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

//import Dialog from "@channel/Dialog";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChannelList from "@channel/ChannelList";
import InboxList from "./InboxList";
const PanelNavbar = () => {
  
   
    const navigate = useNavigate();
    const [isHoverDialogVisible, setIsHoverDialogVisible] = useState(false);
    const userEmail = localStorage.getItem('email');
    const [setChannels] = useState([]);
    const [additionalChannels, setAdditionalChannels] = useState(new Set());

    const getUsername = (email) => {
      return email.split('@')[0];
  };
  
    const handleMouseLeave = () => {
     setIsHoverDialogVisible(false);
    };

    const handleButtonClick = (channel) => {
      navigate(`/message-panel/channels/${channel}`);
    };

    useEffect(() => { 
      fetch('http://206.189.91.54/api/v1/channels') 
        .then(response => response.json())
        .then(data => { 
          setChannels(data);
        })
        .catch(error => {
    
          console.error('Error fetching channels:', error);
    
        });
    
    }, []);

  return (
    
    <div className="slack" >
  
      <div className="sidebar"
      >

        <button className="team-menu" >
          
          <div className="team-menu__info">
            <h1 className="team-menu__name">Hey, {getUsername(userEmail)}</h1>
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
    channels={additionalChannels}
    />


      </ul>
    </div>
    <InboxList/>

        {/* Add channels and DM sections as needed */}
      </div>
     
    </div>

   
  );
};

export default PanelNavbar;