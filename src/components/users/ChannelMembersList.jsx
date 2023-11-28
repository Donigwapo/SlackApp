/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';


const ChannelMembersList = ({ channelId }) => {
  const [channelData, setChannelData] = useState(null);
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const apiUrl = `https://206.189.91.54/api/v1/channels/${channelId}`;
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    const fetchChannelData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access-token': accessToken,
            'client': client,
            'uid': uid,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setChannelData(data.data);
        } else {
          const errorData = await response.json();
          setError(errorData.errors ? errorData.errors[0] : 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching channel data:', error);
        setError('Error fetching channel data');
      }
    };

    fetchChannelData();
  }, [channelId]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
 
  return (
    <div className="channelMembersListContainer">
      <button onClick={openDialog}>
        <span>View Members &#9660;</span>
      </button>

      {channelData && isDialogOpen && (
        <div>
          {/* Your dialog content here */}
          <ul>
            {channelData.channel_members && channelData.channel_members.length > 0 ? (
              channelData.channel_members.map((member) => (
                <li key={member.id}>
                  <p>User ID: {member.user_id}</p>
                </li>
              ))
            ) : (
              <p>No members found for the channel.</p>
            )}
          </ul>

          <button onClick={closeDialog}>Close</button>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default ChannelMembersList;
