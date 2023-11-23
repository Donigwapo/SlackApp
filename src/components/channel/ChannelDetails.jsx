/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const ChannelDetails = ({ channelId }) => {
  const [channelDetails, setChannelDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChannelDetails = async () => {
      const apiUrl = `http://206.189.91.54/api/v1/channels/${channelId}`;
      const accessToken = localStorage.getItem('access-token');
      const client = localStorage.getItem('client');
      const uid = localStorage.getItem('uid');

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
          setChannelDetails(data.data);
        } else {
          const errorData = await response.json();
          setError(errorData.errors ? errorData.errors[0] : 'Unknown error');
        }

        console.log('Full Response:', response);

      } catch (error) {
        console.error('Error fetching channel details:', error);
        setError('Error fetching channel details');
      }
    };

    fetchChannelDetails();
  }, [channelId]);

  return (
    <div className="channelDetailsContainer">
      <h2>Channel Details</h2>

      {channelDetails ? (
        <div>
          <p>ID: {channelDetails.id}</p>
          <p>Name: {channelDetails.name}</p>
          <p>Owner ID: {channelDetails.owner_id}</p>
          <p>Created At: {channelDetails.created_at}</p>
          <p>Updated At: {channelDetails.updated_at}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading channel details...</p>
      )}

      {error && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default ChannelDetails;
