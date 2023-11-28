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
    const [hoverDialogMessage, setHoverDialogMessage] = useState('');
    const userEmail = localStorage.getItem('email');
    const [channels, setChannels] = useState([]);
    const [additionalChannels, setAdditionalChannels] = useState(new Set());

    const getUsername = (email) => {
      return email.split('@')[0];
  };
  
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


    const handleLogout = () => {

      localStorage.removeItem('access-token');
      localStorage.removeItem('client');
      localStorage.removeItem('expiry');
      localStorage.removeItem('uid');
  
      navigate('/');
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
    handleMouseEnter={handleMouseEnter}
    handleMouseLeave={handleMouseLeave}
    channels={additionalChannels}
    />


   {isHoverDialogVisible && (
    <div className="hover-dialog">{hoverDialogMessage}</div>

    )}

      </ul>
    </div>
    <InboxList/>

        {/* Add channels and DM sections as needed */}
      </div>
     
    </div>

   
  );
};

export default PanelNavbar;