/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import ShowChannelDialog from './ShowChannelDialog';
import { toast } from 'react-toastify';


const ChannelList = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleShowMore = () => {
    const remainingChannelNames = channels.slice(10).map(channel => channel.name).join(', ');
    alert(`Remaining channels: ${remainingChannelNames}`);
  };


  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'http://206.189.91.54/api/v1/channels';
      const accessToken = localStorage.getItem('access-token');
      const client = localStorage.getItem('client');
      const expiry = localStorage.getItem('expiry');
      const uid = localStorage.getItem('uid');

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access-token': accessToken,
            'client': client,
            'expiry': expiry,
            'uid': uid,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setChannels(data.data);
          toast.dismiss();
        } else {
          toast.dismiss();
          throw new Error(`Failed to fetch channels: ${response.statusText}`);
          
        }
      } catch (error) {
        console.error('Error fetching channels:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return toast.loading("Fetching Channels") 
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleButtonClick = (channel) => {
    navigate(`/message-panel/channels/${channel.id}/${channel.name}`);
   
  };

  return (
    
    <div className="channels">
   
    <h2 className="channels__heading">

    {channels && channels.length > 0 ? (
    <span>Channels <span className="channels__number">({channels.length})</span></span>
) : (
    <span>Channel</span>
)}
    
    <button className="ion-ios-plus-outline channels__add">
    <IoIosAdd size={30}/><ShowChannelDialog/>
    </button>
  </h2>
  {channels && channels.length > 0 ? (
    <ul className="channels__list">
      {channels.slice(0, 7).map((channel, index) => (
        <li key={index} className="channels__item">
          <button
            className="channels__button"
            onClick={() => handleButtonClick(channel)}
          >
            
            {channel.name.length > 10 ? `${channel.name.slice(0, 10)}...` : channel.name}
          </button>
        </li>
      ))}
          { channels.length > 10 && (
          <li className="channels__item">
             <button onClick={handleShowMore} className="channels__more">
           ......
           </button>
              </li>
         )}

    </ul>
) : (
    <div>No channels available</div>
)}
    </div>
   
  );
};

export default ChannelList;
