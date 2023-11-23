import { useState } from 'react';

const CreateChannel = () => {
  const [channelName, setChannelName] = useState('');
  const [memberIds, setMemberIds] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const createChannel = async () => {
    const apiUrl = 'http://206.189.91.54/api/v1/channels';
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    const payload = {
      channel: {
        name: channelName,
        // Include any other channel properties as needed
      },
      members: memberIds.split(',').map(memberId => parseInt(memberId.trim())),
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
          'client': client,
          'uid': uid,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setResponse('Channel created successfully');
      } else {
        setError(data.errors ? data.errors[0] : 'Unknown error');
      }

      console.log('Full Response:', response);
      
    } catch (error) {
      console.error('Error creating channel:', error);
      setError('Error creating channel');
    }
  };

  return (
    <div className="createChannelContainer">
      <h2>Create Channel</h2>
      <div className="channelForm">
        <label>
          Channel Name:
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </label>
        <label>
          Member IDs (comma-separated):
          <input
            type="text"
            value={memberIds}
            onChange={(e) => setMemberIds(e.target.value)}
          />
        </label>
        <button onClick={createChannel}>Create Channel</button>

        {response && (
          <div style={{ marginTop: '10px' }}>
            <strong>Response:</strong> {response}
          </div>
        )}

        {error && (
          <div style={{ marginTop: '10px', color: 'red' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateChannel;
